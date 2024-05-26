import { useState } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { extractImageText } from "./utils/helpers";
import CustomImagePicker from "./components/CustomImagePicker";
import CustomHighlightText from "./components/CustomHighlightText";

const test1 =
  "整合Web圖次與開放資料之RESTfulAPI服務平台(ARESTfulAPIPlatformforIntegratingMapInformationandWebOpenData)1.研究計畫背景及目的台灣data.gov.tw開放資料平台目前共52,152筆資料集(2022/1/1全部資料集清單下載)。2016GlobalOpenDataIndex(2017之後未再提供),各開放資料項目評比,就整體評估台灣是世界第一(Figure1)。雖然,政府已將開放資料整合於單一平台,但距離API便民化、服務化、智慧化使用尚未達成。TT區|2neeee'atyaFigure1:2016GlobalOpenDataIndex:GovernmentSpending過去計畫中,基於文本分析與搜尋引擎技術,我們建立了iLOD(https://ilod.wke.csie.ncnu.edu.tw/)系統,自動化分析政府開放資料平台龐大散亂的資料集(以可parse的CSV檔案為主),擷取並分析資料集的每一個欄位和每一筆資料,建立開放資料搜尋引擎,讓每一筆資料都可以搜尋,並提供API服務。iLOD前端基於Node.js開發RESTfulAPI服務,整合後端搜尋引擎,讓開放資料可搜尋存取,以便更容易運用於各類應用服務。例如,民眾想要找有關“噪音”的開放資料,在data.govtw搜尋只能找到82個資料集(只能搜尋資料集描述,無法全文搜尋每一筆資料內容);但是透過iLOD搜尋到660個資料集內含噪音資料,詳細可找到數百萬筆datarows。如Figure2所示,含有“咖音”的資料集主要包含:縣市1999歷年派工資料、環保專案摘要資料、科技計畫清單、重要環保統計資料等。從第一筆結果點選【查閱】,如Figure3所示,可以發現台北市每月可能有超過1OMPORRAR的民怨。透過iLOD可以取得各縣市歷年每個月的品音資料位置(範圍)與時間,若能整合於地圖資訊,就可以產出很好的視覺化資訊圖表,以供市政問題探討。2i=|Figure2:透過iLOD搜尋“噪音?”表CM03共20頁第1頁";
const test2 =
  "研究計畫背景及目的台灣data.gov.tw開放資料平台目前共52,152筆資料集(2022/1/1全部資料集清單下載)。2016GlobalOpenDataIndex(2017之後未再提供),各開放資料項目評比,就整體評估台灣是世界第一(Figure1)。雖然,政府已將開放資料整合於單一平台,但距離API便民化、服務化、智慧化使用尚未達成。Figure1:2016GlobalOpenDataIndex:GovernmentSpending過去計畫中,基於文本分析與搜尋引擎技術,我們建立了iLOD(https://ilod.wke.csie.ncnu.edu.tw/)系統,自動化分析政府開放資料平台龐大散亂的資料集(以可parse的CSV檔案為主),擷取並分析資料集的每一個欄位和每一筆資料,建立開放資料搜尋引擎,讓每一筆資料都可以搜尋,並提供API服務。iLOD前端基於Node.js開發RESTfulAPI服務,整合後端搜尋引擎,讓開放資料可搜尋存取,以便更容易運用於各類應用服務。例如,民眾想要找有關“噪音”的開放資料,在data.gov.tw搜尋只能找到82個資料集(只能搜尋資料集描述,無法全文搜尋每一筆資料內容)；但是透過iLOD搜尋到660個資料集內含噪音資料,詳細可找到數百萬筆datarows。如Figure2所示,含有“噪音”的資料集主要包含:縣市1999歷年派工資料、環保專案摘要資料、科技計畫清單、重要環保統計資料等。從第一筆結果點選【查閱】,如Figure3所示,可以發現台北市每月可能有超過1萬筆噪音舉報的民怨。透過iLOD可以取得各縣市歷年每個月的噪音資料位置(範圍)與時間,若能整合於地圖資訊,就可以產出很好的視覺化資訊圖表,以供市政問題探討。";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [extractResult, setExtractResult] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [page, setPage] = useState("");

  const handleExtractPress = async () => {
    setExtractResult(false);
    setIsExtracting(true);
    const response = await extractImageText(image, parseInt(page));
    setExtractResult(response);
    setIsExtracting(false);
  };

  return (
    <ActionSheetProvider>
      <SafeAreaView
        onTouchStart={() => {
          Keyboard.dismiss();
        }}
        style={styles.container}
      >
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={"always"}
        >
          <Text style={styles.titleText}>Python OCR Tool Demo</Text>
          <View style={styles.box}>
            <CustomImagePicker setImage={setImage} />
            <TextInput
              style={styles.pdfInput}
              onChangeText={setPage}
              value={page.toString()}
              placeholder="輸入PDF頁"
              keyboardType="numeric"
            />
          </View>
          {image && (
            <>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <View style={styles.selectImageButton}>
                <Button title="提取圖片文字" onPress={handleExtractPress} />
              </View>
            </>
          )}
          {isExtracting && <ActivityIndicator size="large" />}
          {extractResult && (
            <CustomHighlightText
              originalText={extractResult.original_text}
              ocrText={extractResult.ocr_text}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 500,
  },
  titleText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectImageButton: {
    marginVertical: 30,
  },
  pdfInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  box: {
    flexDirection: "row",
    marginTop: 10,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
