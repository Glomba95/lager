import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Button, View } from "react-native";

export default function DateDropDown({formObject, formObjectProp, setFormObject}) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    // Show datepicker or not, needed for Android.
    const [show, setShow] = useState<Boolean>(false);

    // Needed for Android
    const showDatePicker = () => {
        setShow(true);
    };
    
    // Format date numbers i.e. 6 -> 06
    function zeroPad(number: number): string {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
    }
    
    // Format dates as yyyy-mm-dd
    function formatDate(date: Date): string {
        return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
    }

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);
                        
                        formObject[formObjectProp] = formatDate(date);
                        
                        setFormObject({
                            ...formObject
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}