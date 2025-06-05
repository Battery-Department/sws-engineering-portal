# Battery Components Update Summary

## Overview
This document provides a comprehensive analysis of battery-specific components in the `/src/app/customer/products/` directory that need to be updated based on the search for battery/lithium references.

## Files Containing Battery/Lithium References

### 1. Core Battery Components

#### BatteryCard.tsx
- **Type**: Main battery product card component
- **Key Features**: 
  - Displays battery types (6Ah, 9Ah, 15Ah)
  - Shows FlexVolt branding
  - Pricing and discount calculations
  - Quantity selector
  - Expandable specifications section
  - DeWalt 20V/60V compatibility notice
- **Updates Needed**:
  - Update battery types/models if product line changes
  - Modify pricing structure
  - Update compatibility information
  - Review FlexVolt branding usage

#### BatteryCard2.tsx
- **Type**: Alternative battery card component (needs investigation)
- **Updates Needed**:
  - Determine if this is actively used or a legacy component
  - Align with BatteryCard.tsx if both are needed

#### BatteryComparisonTable.tsx
- **Type**: Battery specification comparison table
- **Key Features**:
  - Compares 6Ah, 9Ah, and 15Ah batteries
  - Interactive battery selector
  - Displays specifications in table format
- **Updates Needed**:
  - Update battery model options
  - Modify specification data structure
  - Review table layout for new battery types

#### BatteryValueCalculator.tsx
- **Type**: Tool runtime calculator based on battery capacity
- **Key Features**:
  - Calculates total Ah capacity
  - Shows estimated runtime for various tools
  - Visual representation of battery value
- **Updates Needed**:
  - Update tool consumption rates
  - Modify calculation logic for new battery types
  - Update UI for new capacity options

### 2. Supporting Components

#### RuntimeCalculator.tsx
- **Type**: Interactive runtime comparison tool
- **Key Features**:
  - Battery and tool selection
  - Runtime comparison chart
  - Summary metrics display
- **Updates Needed**:
  - Update battery options
  - Modify runtime calculation formulas
  - Update tool compatibility data

#### ProductTabs.tsx
- **Type**: Main product information tabs component
- **Key Data**:
  - Battery specifications (Lithium-Ion cell type)
  - Warranty information
  - FAQ content about batteries
- **Updates Needed**:
  - Update battery spec data (lines 51-65)
  - Modify warranty terms if needed
  - Update FAQ content related to batteries

#### UpdatedProductTabs.tsx & UpdatedProductTabsWithToolTable.tsx
- **Type**: Enhanced product tab components
- **Similar to ProductTabs.tsx but with additional features**
- **Updates Needed**:
  - Same as ProductTabs.tsx
  - Ensure consistency across all tab components

#### OrderSummary.tsx
- **Type**: Order summary component
- **Battery Reference**: Imports battery discount progress bar
- **Updates Needed**:
  - Review integration with battery pricing
  - Update discount calculation logic if needed

#### PersistentCart.tsx
- **Type**: Shopping cart component
- **Key Features**:
  - Displays battery items in cart
  - Calculates pricing with discounts
  - Shows battery type and quantity
- **Updates Needed**:
  - Update battery type references
  - Modify pricing calculations
  - Update display format for new products

### 3. Main Page Component

#### page.tsx
- **Type**: Main products page
- **Note**: No direct battery references found, but likely orchestrates other components
- **Updates Needed**:
  - Review component imports and usage
  - Update any hardcoded battery data
  - Ensure proper component integration

## Priority Order for Updates

### High Priority (Update First)
1. **BatteryCard.tsx** - Core product display component
2. **BatteryComparisonTable.tsx** - Key comparison functionality
3. **ProductTabs.tsx** - Contains battery specifications data
4. **PersistentCart.tsx** - Shopping cart functionality

### Medium Priority
5. **BatteryValueCalculator.tsx** - Value proposition display
6. **RuntimeCalculator.tsx** - Tool compatibility information
7. **UpdatedProductTabs.tsx** - Enhanced product information
8. **UpdatedProductTabsWithToolTable.tsx** - Tool compatibility table

### Low Priority
9. **OrderSummary.tsx** - Order summary display
10. **BatteryCard2.tsx** - Potentially legacy component
11. **page.tsx** - Main page orchestration

## Specific Updates Required

### 1. Battery Type/Model Updates
- Current: 6Ah, 9Ah, 15Ah FlexVolt batteries
- Update all references to new battery models/capacities
- Ensure consistent naming across all components

### 2. Lithium-Ion References
- Found in: ProductTabs.tsx, UpdatedProductTabs.tsx, UpdatedProductTabsWithToolTable.tsx
- Line: "Cell Type" specification shows "Lithium-Ion"
- Update if battery chemistry changes

### 3. Compatibility Information
- Current: "Compatible with all DeWalt 20V/60V tools"
- Update compatibility statements across all components
- Modify tool lists if compatibility changes

### 4. Pricing and Discount Logic
- Review basePrice calculations in BatteryCard.tsx
- Update discount tier logic if pricing structure changes
- Ensure consistency in PersistentCart.tsx calculations

### 5. Specifications Data
- Battery weight, dimensions, charge times
- Cell configuration and charge cycles
- Operating temperature ranges
- Warranty periods

### 6. Branding Updates
- FlexVolt branding references
- Battery Department references
- DeWalt compatibility statements

## Recommended Approach

1. **Start with data models**: Update battery specifications in ProductTabs components
2. **Update display components**: Modify BatteryCard and BatteryComparisonTable
3. **Update calculators**: Adjust RuntimeCalculator and BatteryValueCalculator logic
4. **Update cart/checkout**: Ensure PersistentCart handles new products correctly
5. **Test integration**: Verify all components work together with new data

## Notes

- Multiple versions of ProductTabs exist (ProductTabs, UpdatedProductTabs, UpdatedProductTabsWithToolTable) - ensure consistency
- Consider consolidating duplicate components (BatteryCard vs BatteryCard2)
- Some components import from '../../../components/' directory - check if those need updates too
- Battery specifications are hardcoded in multiple places - consider centralizing this data