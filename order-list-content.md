# Inventory Order List System Structure

## Main Categories

### 1. Copper Pipes
- **Available Sizes**: 1/4", 1/2", 3/8", 5/8", 7/8", 3/4", 1-1/8", 1-3/8", 1-5/8"
- **Input Fields per Size**:
  - Type: `Toggle` (Soft/Hard)
  - Quantity: `Number`(pcs)

### 2. Insulation
- **Available Sizes**: 1/8" to 1-5/8"
- **Input Fields per Size**:
  - Quantity: `Number`(pcs)
  - Unit: `Toggle` (ft/meter)
  - Thickness: `Dropdown`
    - Options: 9mm, 13mm, 19mm, 25mm

### 3. Pipe Fittings
- **Size-wise Input Fields**:
  - 1/4": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 3/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 1/2": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 5/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 7/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 1-1/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 1-3/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`
  - 1-5/8": Elbow Quantity: `Number` | Coupling Quantity: `Number`

  - CPVC - quantity:number (feet)
  - UPVC - quantity:number (feet)
  - PVC  - quantity:number (feet)
  -Solvent  - Quantity:number (ml)

### 4. Flare Nut
- **Available Sizes**: 1/4", 1/2", 3/8", 5/8", 3/4"
- **Input Fields per Size**:
  - Quantity: `Number`
  - Unit: Fixed (meter)

### 5. Wires
- **Available Sizes**: 0.5, 1, 1.5, 2.5, 4.0, 6.0 sq mm
- **Input Fields per Size**:
  - Length: `Number` (m)
  - Cores: `Toggle` (2/4/6)

## Individual Items

### Basic Items
1. **Expansion Wall**
   - Quantity: `Number`

2. **Asbestos Rope**
   - Quantity: `Number`

3. **Heater**
   - Length: `Number` (1-100 ft/m)

### Tools
4. **Flaring Tool**
   - Required: `Checkbox`

5. **Brazing Rods**
   - Quantity: `Number`

6. **Butane/LPG**
   - Size: `Toggle` (Small/Big)
   - Quantity: `Number`

7. **Oxygen Cylinders**
   - Quantity: `Number`

8. **Nitrogen**
   - Quantity: `Number`

### Tools & Materials
9. **Drain Heater**
   - Length: `Number` (ft)

10. **Monsoon Tape**
    - Length: `Number`
    - Quantity: `Number`

11. **Teflon Tape**
    - Quantity: `Number`

12. **Tarfelt**
    - Length: `Number`
    - Unit: `Toggle` (meter/roll)
    - Quantity: `Number`

13. **Liquid Puff**
    - Quantity: `Number` (L)

14. **Hatlon**
    - Length: `Number`
    - Unit: `Toggle` (ft/meter)

15. **Threaded Rod**
    - Size: `Dropdown` (8mm/10mm/12mm)
    - Length: `Number` (m)
    - Quantity: `Number`

16. **Nut & Washer**
    - Size: `Dropdown`
    - Length: `Radio`
    - Quantity: `Number`

17. **Nut Bolt**
    - Size: `Dropdown`
    - Length: `Dropdown`
    - Quantity: `Number`

18. **Drill Machine**
    - Required: `Checkbox`
    - Size: `Toggle` (Small/Big)

19. **Drill Bit Set**
    - Quantity: `Number`
    - Sizes: `Text` (8mm/10mm/12mm)

20. **Silicone**
    - Quantity: `Number`
    - Color: `Radio` (White/Clear/Gray)
    - Gun Required: `Checkbox`

### Electrical Components
21. **Contactor**
    - Type: `Radio` (NO/NC)
    - Quantity: `Number`

22. **SPPR (Surge Protector)**
    - Quantity: `Number`

23. **Wire Clip**
    - Quantity: `Number`

24. **Switch Box**
    - Quantity: `Number`

25. **Hooter**
    - Quantity: `Number`

26. **Weather Switch**
    - Quantity: `Number`

27. **Bell Switch**
    - Quantity: `Number`

### Additional Tools
28. **Fastener**
    - Size: `Dropdown`
    - Length: `Checkboxes` (3,4,5,6 inch)
    - Quantity: `Number`

29. **Spring Bender**
    - Size: `Dropdown`
    - Quantity: `Number`

30. **Gas Batti Set**
    - Quantity: `Number`

31. **Sensor Wire**
    - Quantity: `Number`
    - Length: `Number` (m)

32. **Vacuum Pump**
    - Required: `Checkbox`

33. **Drain Selection T**
    - Selection: `Checkbox`

34. **LED Light**
    - Size: `Toggle` (2ft/4ft)
    - Quantity: `Number`

35. **Controller**
    - Quantity: `Number`

36. **Controller Box**
    - Quantity: `Number`

## Input Types Summary

### Basic Input Types
- `Number`: For quantities, lengths, measurements
- `Text`: For custom descriptions or specific inputs
- `Checkbox`: For required items and selections
- `Radio`: For single choice options
- `Dropdown`: For predefined choices
- `Toggle`: For 2-3 option switches

### Advanced Controls
- Triple Toggle: For wire cores (2/4/6)
- Unit Toggle: For ft/meter switching
- Size Toggle: For Small/Big options
- Multi-attribute Forms: For complex items with multiple inputs
