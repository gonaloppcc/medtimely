import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { decompressQRCode } from '../services/prescription';

export function QRScanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
        );
        console.log(decompressQRCode(data));
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {scanned ? (
                <Button
                    onPress={() => {
                        setScanned(false);
                    }}
                >
                    Scan again
                </Button>
            ) : (
                <Camera
                    style={styles.camera}
                    onBarCodeScanned={handleBarCodeScanned}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    camera: { height: '100%' },
});
