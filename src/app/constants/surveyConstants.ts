import { ItemPickerProp } from "../../components/Picker";

export const physicalActivityOptionsMap = { 
    'Never': 'never',
    '1-2 times per week': '1_2_times_per_week',
    '3-4 times per week': '3_4_times_per_week',
    '5 or more times per week': '5_or_more_times_per_week',
    'Daily': 'daily'
};

export const pharmacyVisitsOptionsMap = {
    'Never': 'never',
    'Rarely (few times per year)': 'rarely',
    'Monthly': 'monthly',
    'Once a week': 'once_a_week',
    'Several times a week': 'several_times_a_week',
};

export const medicationUseOptionsMap = {
    'Not Applicable': 'not_applicable',
    'Rarely (occasional use)': 'rarely',
    'As needed (when symptoms occur)': 'as_needed',
    'Regularly (as prescribed)': 'regularly',
    'Daily (multiple times per day)': 'daily',
    'Multiple medications': 'multiple_medications',
};

export const planFollowedOptionsMap = {
    'Not Applicable': 'not_applicable',
    'Rarely': 'rarely',
    'Sometimes': 'sometimes',
    'Most of the time': 'most_of_the_time',
    'Always': 'always',
};

export const sleepHoursOptionsMap = {
    'Less than 6 hours': 'less_than_6_hours',
    '6-7 hours': '6_7_hours',
    '7-8 hours': '7_8_hours',
    '8-9 hours': '8_9_hours',
    'More than 9 hours': 'more_than_9_hours',
};

export const stressLevelOptionsMap = {
    'Low': 'low',
    'Moderate': 'moderate',
    'High': 'high',
    'Very High': 'very_high',
};

export const dietQualityOptionsMap = {
    'Poor': 'poor',
    'Fair': 'fair',
    'Good': 'good',
    'Very Good': 'very_good',
    'Excellent': 'excellent',
};

export const smokingHabitOptionsMap = {
    'Never Smoked': 'never_smoked',
    'Former Smoker': 'former_smoker',
    'Current Smoker': 'current_smoker',
};

export const alcoholConsumptionOptionsMap = {
    'Never': 'never',
    'Rarely': 'rarely',
    'Occasional': 'occasional',
    'Regularly': 'regularly',
};

export const createOptionsFromMap = (optionsMap: Record<string, string>): ItemPickerProp[] => {
    return Object.keys(optionsMap).map(label => ({ label, value: optionsMap[label] }));
};

export const getValueFromLabel = (value: string, optionsMap: Record<string, string>): string | undefined => {
    const entry = Object.entries(optionsMap).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
};