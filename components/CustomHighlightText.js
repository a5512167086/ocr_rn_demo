import { diffChars } from "diff";
import { Text, View } from "react-native";

export default function CustomHighlightText({ originalText, ocrText }) {
  const diffResult = diffChars(originalText, ocrText);

  return (
    <View>
      <Text>
        {diffResult.map((diff, index) => (
          <Text
            style={{
              color: diff.added || diff.removed ? "white" : "black",
              backgroundColor: diff.added
                ? "green"
                : diff.removed
                ? "red"
                : null,
            }}
            key={diff.value + index}
          >
            {diff.value}
          </Text>
        ))}
      </Text>
    </View>
  );
}
