import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';

export const useInventory = (inventoryCategories) => {
  const { supabase, user } = useSupabase();
  const [inventoryData, setInventoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize inventory data structure
  const initializeInventoryData = useCallback(() => {
    const initialData = {};
    inventoryCategories?.forEach(category => {
      category?.items?.forEach(item => {
        initialData[item.id] = {};
        item?.fields?.forEach(field => {
          initialData[item.id][field.key] = field?.defaultValue || '';
        });
      });
    });
    return initialData;
  }, [inventoryCategories]);

  // Load inventory data from Supabase
  const loadInventoryData = useCallback(async () => {
    if (!user) {
      // If no user, load from localStorage as fallback
      const savedData = localStorage.getItem('hvac-order-data');
      if (savedData) {
        setInventoryData(JSON.parse(savedData));
      } else {
        setInventoryData(initializeInventoryData());
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory_orders')
        .select('data')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      if (data) {
        setInventoryData(data.data);
      } else {
        // No data in Supabase, initialize
        const initialData = initializeInventoryData();
        setInventoryData(initialData);
        // Save initial data to Supabase
        await saveInventoryData(initialData);
      }
    } catch (err) {
      console.error('Error loading inventory data:', err);
      setError(err.message);
      // Fallback to localStorage
      const savedData = localStorage.getItem('hvac-order-data');
      if (savedData) {
        setInventoryData(JSON.parse(savedData));
      } else {
        setInventoryData(initializeInventoryData());
      }
    } finally {
      setLoading(false);
    }
  }, [user, supabase, initializeInventoryData]);

  // Save inventory data to Supabase
  const saveInventoryData = useCallback(async (data) => {
    if (!user) {
      // Save to localStorage as fallback
      localStorage.setItem('hvac-order-data', JSON.stringify(data));
      return;
    }

    try {
      const { error } = await supabase
        .from('inventory_orders')
        .upsert({
          user_id: user.id,
          data: data,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Also save to localStorage as backup
      localStorage.setItem('hvac-order-data', JSON.stringify(data));
    } catch (err) {
      console.error('Error saving inventory data:', err);
      setError(err.message);
      // Fallback to localStorage
      localStorage.setItem('hvac-order-data', JSON.stringify(data));
    }
  }, [user, supabase]);

  // Update inventory data
  const updateInventoryData = useCallback((newData) => {
    setInventoryData(newData);
    saveInventoryData(newData);
  }, [saveInventoryData]);

  // Load data on mount and when user changes
  useEffect(() => {
    loadInventoryData();
  }, [loadInventoryData]);

  return {
    inventoryData,
    loading,
    error,
    updateInventoryData,
    saveInventoryData,
  };
};
