import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { Button, StyleSheet } from "react-native";

export default function CustomImagePicker({ setImage }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const pickImage = async (action) => {
    let image;

    if (action === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
      image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    }
    if (action === "imageLibrary") {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    }

    if (!image.canceled) {
      setImage(image.assets[0]);
    }
  };

  const onPress = () => {
    const options = ["拍攝照片", "選取照片", "取消"];
    const cameraButtonIndex = 0;
    const imageLibraryButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case cameraButtonIndex:
            pickImage("camera");
            break;
          case imageLibraryButtonIndex:
            pickImage("imageLibrary");
            break;
          case cancelButtonIndex:
            break;
        }
      }
    );
  };

  return <Button title="拍攝或選取照片" onPress={onPress} />;
}
