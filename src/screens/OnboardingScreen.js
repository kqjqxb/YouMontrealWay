import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import youOnboardingMontRealData from '../components/youOnboardingMontRealData';
import { useNavigation } from '@react-navigation/native';

const fontInterRegular = 'Inter-Regular';

const OnboardingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const [currentYouMontSlideIndex, setCurrentYouMontSlideIndex] = useState(0);
  const scrollYouMontX = useRef(new Animated.Value(0)).current;
  const slidesYouMontRef = useRef(null);

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentYouMontSlideIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToTheNextYouMontSlide = () => {
    if (currentYouMontSlideIndex < youOnboardingMontRealData.length - 1) {
      slidesYouMontRef.current.scrollToIndex({ index: currentYouMontSlideIndex + 1 });
    } else {
      navigation.replace('Home');
    }
  };


  const renderYouMontItem = ({ item }) => (
    <SafeAreaView style={{ width: dimensions.width, flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >
      <View style={{
        zIndex: 1,
        width: dimensions.width * 0.92,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginTop: dimensions.height * 0.08,
      }}>
        <Text
          style={{
            paddingHorizontal: dimensions.width * 0.04,
            fontFamily: fontInterRegular,
            fontWeight: 700,
            color: 'white',
            maxWidth: dimensions.width * 0.9,
            alignSelf: 'flex-start',
            fontSize: dimensions.width * 0.075,
            marginTop: dimensions.height * 0.03,
            textAlign: 'left',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontWeight: 400,
            marginTop: dimensions.height * 0.03,

            textAlign: 'left',
            alignSelf: 'flex-start',
            fontFamily: fontInterRegular,

            color: '#fff',
            fontSize: dimensions.width * 0.05,

            paddingHorizontal: dimensions.width * 0.04,
          }}>
          {item.description}
        </Text>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView
      style={{ justifyContent: 'space-between', flex: 1, backgroundColor: '#160002', alignItems: 'center', }}
    >
      <View style={{ display: 'flex' }}>
        <View style={{
          alignItems: 'center',
          width: dimensions.width,
          alignSelf: 'center',
        }}>
          <Image
            source={require(`../assets/images/youOnbImage.png`)}
            style={{
              width: dimensions.width * 0.75,
              marginRight: dimensions.width * 0.04,
              height: dimensions.height * 0.35,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </View>

        <FlatList
          pagingEnabled
          data={youOnboardingMontRealData}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={renderYouMontItem}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollYouMontX } } }], {
            useNativeDriver: false,
          })}
          ref={slidesYouMontRef}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (currentYouMontSlideIndex === youOnboardingMontRealData.length - 1) {
            navigation.replace('LoadYouMontApp');
          } else scrollToTheNextYouMontSlide();
        }}
        style={{
          bottom: dimensions.height * 0.15,
          borderRadius: dimensions.width * 0.055,
          width: dimensions.width * 0.5,
          height: dimensions.height * 0.08,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#A53319',
          alignSelf: 'flex-start',
          marginLeft: dimensions.width * 0.04,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontFamily: fontInterRegular,
            fontSize: dimensions.width * 0.05,
            color: '#fff',
          }}>
          {currentYouMontSlideIndex === youOnboardingMontRealData.length - 1 ? 'Start' : currentYouMontSlideIndex === 1 ? 'Go next' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
