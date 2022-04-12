import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "./../slices/navSlice";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      multiplier: 2,
      image: "https://links.papareact.com/5w8",
    },
    {
      id: "Uber-LUX-789",
      title: "Uber LUX",
      multiplier: 3,
      image: "https://links.papareact.com/7pf",
    },
  ];

  const surgeChargeRate = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute left-5 z-50 top-3 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>

        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, image, title, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`px-10 flex-row items-center justify-between ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`font-semibold text-xl`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration.value *
                  surgeChargeRate *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
