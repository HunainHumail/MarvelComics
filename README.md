# Read me
## _MARVEL COMICS_


   An Application for searching you favourite Marvel Character Comic Books. 

- Search any Marvel Character from 70,000 Marvel Character
- See all the Comics related to that specific Character
- ✨Attractive Comic Like User Interface✨

## Features

- Search by name of that character by searching name starts with
    Example: Type 'S' and you can see all the characters starting with 'S'
- Pagination implemented while getting the data from API
- AsyncStorage used for character data
- Axios for getting data from APIs
- Responsive Screen Design


## Project Structure

### A top-level directory layout

    .
    ├── __tests__                   # Where all the test cases would be written
    ├── android                     # Android  Files
    ├── ios                         # ios files
    ├── src                         # Project Files
    ├── App.js                      # Main file 
    ├── app.json
    ├── babel.config.js
    ├── index.js                    #Root file
    ├── metro.config
    ├── package.json
    ├── react-native-config.js
    ├── README.md
    
### Source folder

    ├── src                  
        ├── assets                    # all raw images and fonts
        ├── components                # Components which are used in application
        ├── config                    # All the configuration files
        ├── containers                # All the screens  containers
        ├── screens                   # All the screens 
        ├── stacks                    # All the navigation stacks
        

### Components folder

    ├── components                 
        ├── AppButton                    # Common App Button component
        ├── CharacterModal               # Character Modal Component
        ├── CharacterListTile            # Searched character tiles
        ├── ComicListTile                # Searched comic list tiles
        ├── index.js                     # All the components exported from here 
        
### Configuration folder

    ├── config                 
        ├── Api                     # Api configuration
        ├── Colors                  # All App Colors
        ├── Fonts                   #  All App fonts
        ├── Images                  # All App images
        ├── NavigationService       # Navigation configuration
        ├── Responsive              # Screen heigh and width dimension config
        ├── Utils                   # Application utilities and constants
        ├── index.js                # All files exported from here

### Containers folder

    ├── containers                 
        ├── AppScreens      
            ├── ChangeCharacterScreen  
                 ├── index.js                      # UI Component
                 ├── index.js.service              # Business Logic Component
           ├── HomeScreen  
                 ├── index.js                      # UI Component
                 ├── index.js.service              # Business Logic Component
        ├── InitialScreens      
            ├── OnboardingScreen  
                 ├── index.js                      # UI Component
                 ├── index.js.service              # Business Logic Component
           ├── SplashScreen  
                 ├── index.js                      # UI Component
                 ├── index.js.service              # Business Logic Component

### Screens folder
In this folder all the App Containers are wrapped in logical component (Reder props method)

    ├── screens                 
           ├── ChangeCharacterScreen  
                 ├── index.js                      
           ├── HomeScreen  
                 ├── index.js                
           ├── OnboardingScreen  
                 ├── index.js                   
           ├── SplashScreen  
                 ├── index.js                   

### Stacks folder
In this folder all the App Navigation Stacks

    ├── screens                 
        ├── HomeStack.js 
        ├── InitialStack.js
        ├── MainStack.js



        
        
        
Commands used

```sh
npm install
npm start
react-native run-android
yarn add
yarn
npm install
npm start
react-native start
```

## Packages used

Following npm packages are used in this project

| Plugin | README |
| ------ | ------ |
| AsyncStorage | [https://www.npmjs.com/package/@react-native-community/async-storage] |
| React Navigation | [https://reactnavigation.org/] |
| Native Base | [https://nativebase.io/] |
| Moment | [https://www.npmjs.com/package/moment] |
| MD5 | [https://www.npmjs.com/package/md5] |
| React Native Snap Carousel | [https://github.com/meliorence/react-native-snap-carousel] |
| Axios | [https://www.npmjs.com/package/axios]|
| React Native Blur | [https://www.npmjs.com/package/@react-native-community/blur] |




## License

MIT

**MARVEL COMICS APP**
 