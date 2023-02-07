import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Button, View } from "react-native";

export default function DateDropDown(props: any) {
    // Selected Date
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    // Show datepicker or not, needed for Android.
    const [show, setShow] = useState<Boolean>(false);

    // FIXME Sätt useEffect med [] för att sätta delivery_date default?

    // Needed for Android
    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}