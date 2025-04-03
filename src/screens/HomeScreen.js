import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Share,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import NeshineFavouritesScreen from './NeshineFavouritesScreen';
import NeshineMapScreen from './NeshineMapScreen';

import mysticWondersData from '../components/mysticWondersData';
import goldenHeritageData from '../components/goldenHeritageData';
import sunsetSerenityData from '../components/sunsetSerenityData';
import localDelightsData from '../components/localDelightsData';
import Loader from '../components/Loader';
import GalleryScreen from './GalleryScreen';
import NeshineBlogScreen from './NeshineBlogScreen';
import WelcomePageScreen from './WelcomePageScreen';
import NeshineQuizzScreen from './NeshineQuizzScreen';
import { CalendarIcon } from 'react-native-heroicons/solid';
import MapView, { Marker } from 'react-native-maps';
import { ArrowLeftIcon, ShareIcon } from 'react-native-heroicons/outline';

const allCulinaryRestaurantsData = [...goldenHeritageData, ...mysticWondersData, ...sunsetSerenityData, ...localDelightsData];

const fontInterRegular = 'Inter-Regular';

const bottomBtns = [
  {
    id: 1,
    screen: 'Home',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontHomeIcon.png'),
  },
  {
    id: 2,
    screen: 'NeshineFavorites',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontPlacesIcon.png'),
  },
  {
    id: 3,
    screen: 'NeshineMap',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontInfoIcon.png'),
  },
  {
    id: 4,
    screen: 'NeshineFavorites',
    youIconMont: require('../assets/icons/youHomeMontIcons/youMontFavIcon.png'),
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedNeshineScreen, setSelectedNeshineScreen] = useState('Home');
  const [savedNeshinePlaces, setSavedNeshinePlaces] = useState([]);
  const [isNeshineMapPlaceVisible, setIsNeshineMapPlaceVisible] = useState(false);
  const [selectedNeshinePlace, setSelectedNeshinePlace] = useState(null);

  const [isFullMapVisible, setIsFullMapVisible] = useState(false);


  const loadCulinaryRestaurats = async () => {
    try {
      const storedNeshinePlaces = await AsyncStorage.getItem('savedNeshinePlaces');
      const parsedNeshinePlaces = storedNeshinePlaces ? JSON.parse(storedNeshinePlaces) : [];
      setSavedNeshinePlaces(parsedNeshinePlaces);
    } catch (error) {
      console.error('Error loading savedNeshinePlaces:', error);
    }
  };

  useEffect(() => {
    loadCulinaryRestaurats();
  }, []);

  const isNeshinePlaceSaved = (shinePlace) => {
    return savedNeshinePlaces.some((nPlace) => nPlace.id === shinePlace?.id);
  };

  const saveNeshinePlace = async (neshinePlace) => {
    try {
      const savedNeshinePlace = await AsyncStorage.getItem('savedNeshinePlaces');
      const parsedNeshinePlaces = savedNeshinePlace ? JSON.parse(savedNeshinePlace) : [];

      const thisShinePlaceIndex = parsedNeshinePlaces.findIndex((r) => r.id === neshinePlace.id);

      if (thisShinePlaceIndex === -1) {
        const updatedShinePlaces = [neshinePlace, ...parsedNeshinePlaces];
        await AsyncStorage.setItem('savedNeshinePlaces', JSON.stringify(updatedShinePlaces));
        setSavedNeshinePlaces(updatedShinePlaces);
      } else {
        const updatedShinePlaces = parsedNeshinePlaces.filter((r) => r.id !== neshinePlace.id);
        await AsyncStorage.setItem('savedNeshinePlaces', JSON.stringify(updatedShinePlaces));
        setSavedNeshinePlaces(updatedShinePlaces);
      }
    } catch (error) {
      console.error('error of save/delete shine place:', error);
    }
  };

  const shareNeshinePlace = async (title) => {
    try {
      await Share.share({
        message: `Let's go to the restaurant ${title}! I found it on the NeShine - Nevşehir Shine!`,
      });
    } catch (error) {
      console.error('Error share:', error);
    }
  };

  return (
    <View style={{
      backgroundColor: '#160002',
      width: '100%',
      flex: 1,
      height: dimensions.height,
    }}>
      <View style={{
        width: dimensions.width,
        backgroundColor: '#2D1304',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: dimensions.height * 0.18,
      }}>
        <SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image
            source={require('../assets/images/youMontUpImage.png')}
            style={{
              width: dimensions.width * 0.8,
              height: dimensions.height * 0.1,
              top: -dimensions.height * 0.01,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />
        </SafeAreaView>

      </View>

      {selectedNeshineScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          width: dimensions.width,
        }}>
          {!isFullMapVisible ? (
            <>
              <Text
                style={{
                  fontSize: dimensions.width * 0.05,
                  textAlign: "left",
                  alignSelf: 'flex-start',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: fontInterRegular,
                  textTransform: 'uppercase',
                  marginTop: dimensions.height * 0.01,
                  paddingHorizontal: dimensions.width * 0.04,
                }}
              >
                Interesting facts for every day
              </Text>

              <View style={{
                width: dimensions.width * 0.92,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.02,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: dimensions.width * 0.03,
                flexDirection: 'row',
                backgroundColor: '#A53319',
                borderRadius: dimensions.width * 0.055,
                paddingVertical: dimensions.height * 0.01,
                height: dimensions.height * 0.12,
              }}>
                <Text
                  style={{
                    fontSize: dimensions.width * 0.035,
                    textAlign: "left",
                    fontWeight: 600,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textTransform: 'uppercase',
                    maxWidth: dimensions.width * 0.6,
                  }}
                >
                  Montreal is the second largest French-speaking city in the world after Paris.
                </Text>

                <View style={{
                  width: dimensions.width * 0.23,
                  height: dimensions.height * 0.05,
                  backgroundColor: '#160002',
                  borderRadius: dimensions.width * 0.03,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                  <CalendarIcon size={dimensions.height * 0.025} color='white' />
                  <Text
                    style={{
                      fontSize: dimensions.width * 0.037,
                      textAlign: "left",
                      fontWeight: 700,
                      color: 'white',
                      fontFamily: fontInterRegular,
                      textTransform: 'uppercase',
                      maxWidth: dimensions.width * 0.6,
                      marginLeft: dimensions.width * 0.01,
                    }}
                  >
                    Day: 1
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: dimensions.width * 0.05,
                  textAlign: "left",
                  alignSelf: 'flex-start',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: fontInterRegular,
                  textTransform: 'uppercase',
                  marginTop: dimensions.height * 0.03,
                  paddingHorizontal: dimensions.width * 0.04,
                }}
              >
                Map Montreal
              </Text>

              <MapView
                style={{
                  width: dimensions.width * 0.92,
                  borderRadius: dimensions.width * 0.055,
                  height: dimensions.height * 0.3,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                  zIndex: 50
                }}
                region={{
                  latitude: allCulinaryRestaurantsData[0].coordinates.latitude,
                  longitude: allCulinaryRestaurantsData[0].coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >

                {allCulinaryRestaurantsData.map((location, index) => (
                  <Marker
                    key={index}
                    coordinate={location.coordinates}
                    title={location.title}
                    description={location.description}
                    pinColor={"#A53319"}
                  />
                ))}
              </MapView>

              <TouchableOpacity
                onPress={() => {
                  setIsFullMapVisible(true);
                }}
                style={{
                  width: dimensions.width * 0.92,
                  height: dimensions.height * 0.07,
                  backgroundColor: '#A53319',
                  borderRadius: dimensions.width * 0.05,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: dimensions.height * 0.015,
                }}>
                <Text
                  style={{
                    fontSize: dimensions.width * 0.045,
                    textAlign: "center",
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textTransform: 'uppercase',
                  }}
                >
                  Open map
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  // setIsFullMapVisible((prev) => !prev);
                  setIsFullMapVisible(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: dimensions.width * 0.04,
                  marginTop: dimensions.height * 0.015,
                }}>
                <ArrowLeftIcon size={dimensions.width * 0.07} color='white' />
                <Text
                  style={{
                    fontSize: dimensions.width * 0.045,
                    textAlign: "center",
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: fontInterRegular,
                    textTransform: 'uppercase',
                    marginLeft: dimensions.width * 0.025,
                  }}
                >
                  Map Montreal
                </Text>
              </TouchableOpacity>

              <MapView
                style={{
                  width: dimensions.width * 0.92,
                  borderRadius: dimensions.width * 0.055,
                  height: dimensions.height * 0.6,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                  zIndex: 0,
                }}
                region={{
                  latitude: allCulinaryRestaurantsData[0].coordinates.latitude,
                  longitude: allCulinaryRestaurantsData[0].coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >

                {allCulinaryRestaurantsData.map((location, index) => (
                  <Marker
                    key={index}
                    coordinate={location.coordinates}
                    title={location.title}
                    description={location.description}
                    pinColor={selectedNeshinePlace && location.coordinates === selectedNeshinePlace.coordinates ? "#181818" : "#A53319"}
                    onPress={() => {
                      setSelectedNeshinePlace(location);
                      setIsNeshineMapPlaceVisible(true);
                    }}
                  />
                ))}
              </MapView>

              {selectedNeshinePlace && isNeshineMapPlaceVisible && (
                <View style={{
                  width: dimensions.width * 0.9,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: dimensions.width * 0.03,
                  flexDirection: 'row',
                  backgroundColor: '#2D1304',
                  borderRadius: dimensions.width * 0.055,
                  paddingVertical: dimensions.height * 0.01,
                  height: dimensions.height * 0.2,
                  position: 'absolute',
                  bottom: dimensions.height * 0.18,
                }}>
                  <Image
                    source={require('../assets/images/neshinePlacesImages/galleryImage.png')}
                    style={{
                      width: dimensions.width * 0.35,
                      height: dimensions.width * 0.35,
                      borderRadius: dimensions.width * 0.03,
                    }}
                    resizeMode='cover'
                  />

                  <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: dimensions.width * 0.35,
                    marginLeft: dimensions.width * 0.03,
                  }}>
                    <Text
                      style={{
                        fontSize: dimensions.width * 0.045,
                        textAlign: "left",
                        fontWeight: 700,
                        color: 'white',
                        alignSelf: 'flex-start',
                        fontFamily: fontInterRegular,
                      }}
                    >
                      {selectedNeshinePlace?.title}
                    </Text>

                    <Text
                      style={{
                        fontSize: dimensions.width * 0.03,
                        textAlign: "left",
                        fontWeight: 400,
                        color: 'white',
                        fontFamily: fontInterRegular,
                        marginTop: dimensions.height * 0.01,
                      }}
                    >
                      {selectedNeshinePlace?.description}
                    </Text>

                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: dimensions.height * 0.01,
                      width: dimensions.width * 0.45,
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          setIsNeshineMapPlaceVisible(false);
                          setSelectedNeshinePlace(null);
                        }}
                        style={{
                          width: dimensions.width * 0.18,
                          height: dimensions.height * 0.05,
                          backgroundColor: '#A53319',
                          borderRadius: dimensions.width * 0.02,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: dimensions.width * 0.04,
                            textAlign: "center",
                            fontWeight: 700,
                            color: 'white',
                            fontFamily: fontInterRegular,
                          }}
                        >
                          Close
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          saveNeshinePlace(selectedNeshinePlace);
                        }}
                        style={{
                          width: dimensions.width * 0.115,
                          height: dimensions.height * 0.05,
                          backgroundColor: isNeshinePlaceSaved(selectedNeshinePlace) ? '#A53319' : 'transparent',
                          borderRadius: dimensions.width * 0.02,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#A53319',
                          borderWidth: isNeshinePlaceSaved(selectedNeshinePlace) ? 0 : dimensions.width * 0.004,
                        }}>
                        <Image
                          source={isNeshinePlaceSaved(selectedNeshinePlace)
                            ? require('../assets/icons/youHomeMontIcons/youMontFavIcon.png')
                            : require('../assets/icons/emptyHeartYouMontIcon.png')
                          }
                          style={{
                            width: dimensions.width * 0.05,
                            height: dimensions.width * 0.05,
                          }}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          shareNeshinePlace(selectedNeshinePlace.title);
                        }}
                        style={{
                          width: dimensions.width * 0.115,
                          height: dimensions.height * 0.05,
                          backgroundColor: 'transparent',
                          borderColor: '#A53319',
                          borderWidth: dimensions.width * 0.004,
                          borderRadius: dimensions.width * 0.02,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../assets/icons/shareYouMontIcon.png')}
                          style={{
                            width: dimensions.width * 0.05,
                            height: dimensions.width * 0.05,
                          }}
                          resizeMode='contain'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

        </SafeAreaView>
      ) : selectedNeshineScreen === 'NeshineFavorites' ? (
        <NeshineFavouritesScreen setSelectedNeshineScreen={setSelectedNeshineScreen} setSelectedNeshinePlace={setSelectedNeshinePlace} savedNeshinePlaces={savedNeshinePlaces} setSavedNeshinePlaces={setSavedNeshinePlaces} setIsNeshineMapPlaceVisible={setIsNeshineMapPlaceVisible} />
      ) : selectedNeshineScreen === 'NeshineMap' ? (
        <NeshineMapScreen setSelectedNeshineScreen={setSelectedNeshineScreen} selectedNeshinePlace={selectedNeshinePlace} isNeshineMapPlaceVisible={isNeshineMapPlaceVisible} setIsNeshineMapPlaceVisible={setIsNeshineMapPlaceVisible} setSavedNeshinePlaces={setSavedNeshinePlaces} savedNeshinePlaces={savedNeshinePlaces} selectedNeshineScreen={selectedNeshineScreen} />
      ) : selectedNeshineScreen === 'GalleryScreen' ? (
        <GalleryScreen setSelectedNeshineScreen={setSelectedNeshineScreen} setSavedNeshinePlaces={setSavedNeshinePlaces} savedNeshinePlaces={savedNeshinePlaces} />
      ) : selectedNeshineScreen === 'NeshineBlog' ? (
        <NeshineBlogScreen setSelectedNeshineScreen={setSelectedNeshineScreen} setSavedNeshinePlaces={setSavedNeshinePlaces} savedNeshinePlaces={savedNeshinePlaces} />
      ) : selectedNeshineScreen === 'WelcomePage' ? (
        <WelcomePageScreen setSelectedNeshineScreen={setSelectedNeshineScreen} setSavedNeshinePlaces={setSavedNeshinePlaces} savedNeshinePlaces={savedNeshinePlaces} />
      ) : null}

      {selectedNeshineScreen !== 'LoadingNeshine' && (
        <View
          style={{
            position: 'absolute',
            bottom: dimensions.height * 0.03,
            backgroundColor: '#2D1304',
            height: dimensions.height * 0.1,
            width: dimensions.width * 0.92,
            borderColor: '#FDCC06',
            paddingHorizontal: dimensions.width * 0.035,
            borderRadius: dimensions.width * 0.04,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            zIndex: 4444,
          }}
        >
          {bottomBtns.map((button, index) => (
            <TouchableOpacity
              key={button.id}
              onPress={() => setSelectedNeshineScreen(button.screen)}
              style={{
                justifyContent: 'center',
                backgroundColor: selectedNeshineScreen === button.screen ? '#A53319' : 'transparent',
                width: dimensions.height * 0.07,
                height: dimensions.height * 0.07,
                borderRadius: dimensions.height * 0.015,
                alignItems: 'center',
              }}
            >
              <Image
                source={button.youIconMont}
                style={{
                  width: dimensions.height * 0.04,
                  height: dimensions.height * 0.04,
                  textAlign: 'center'
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
