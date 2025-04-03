import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoadYouMontAppScreen = ({ setSelectedNeshineScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();

  const images = [
    require('../assets/images/starImage.png'),
    require('../assets/images/neshineLoadImage1.png'),
    require('../assets/images/neshineLoadImage2.png'),
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [starFinished, setStarFinished] = useState(false);
  const imageRef = useRef(null);
  const starRef = useRef(null);


  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000)
  }, []);

  const starAnimation = {
    from: { translateY: -dimensions.height * 0.5, rotate: '0deg' },
    to: { translateY: dimensions.height * 1.2, rotate: '720deg' },
  };

  const onStarAnimationEnd = () => {
    setTimeout(() => {
      setStarFinished(true);
    }, 0);
  };

  useEffect(() => {
    if (starFinished) {
      // Delay before starting the first image fadeIn (optional)
      const timer = setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.fadeIn(800).then(() => {
            // Wait a moment then fade out the image
            setTimeout(() => {
              imageRef.current.fadeOut(800).then(() => {
                // Move to the next image
                setCurrentImageIndex(prev => prev + 1);
              });
            }, 800);
          });
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [starFinished, currentImageIndex]);

  return (
    <View style={{
      backgroundColor: '#160002',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      zIndex: 1,
    }}>
      <Animatable.Image
        source={require('../assets/images/loadYouMontImage.png')}
        style={{
          width: dimensions.height * 0.15,
          height: dimensions.height * 0.15,
        }}
        resizeMode="contain"
        animation={{
          from: { rotate: '0deg' },
          to: { rotate: '1080deg' }, // Three full clockwise rotations
        }}
        duration={3000}
        easing="linear"
      />
    </View>
  );
};

export default LoadYouMontAppScreen;
