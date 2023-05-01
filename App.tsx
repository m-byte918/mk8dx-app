import React from 'react';
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    Image,
    View,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import styles from './AppStyles';
import bodyStats from "./stats/body.json";
import driverStats from "./stats/driver.json";
import gliderStats from "./stats/glider.json";
import tireStats from "./stats/tire.json";

// @ts-ignore
const bodies = require.context('./img/bodies', false, /\.(png|jpe?g|svg)$/);
// @ts-ignore
const drivers = require.context('./img/drivers', false, /\.(png|jpe?g|svg)$/);
// @ts-ignore
const gliders = require.context('./img/gliders', false, /\.(png|jpe?g|svg)$/);
// @ts-ignore
const tires = require.context('./img/tires', false, /\.(png|jpe?g|svg)$/);

const configureAnimation = () => {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(
            300,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.scaleXY
        )
    );
};

const SquareButton = ({
    image,
    onPress,
    selected,
}: {
    image: number;
    onPress: () => void;
    selected: boolean;
}) => (
    <TouchableOpacity
        style={[
            styles.button,
            selected && {
                borderColor: 'yellow',
                borderWidth: 4,
                backgroundColor: 'rgba(192, 192, 192, 0.5)',
            },
        ]}
        onPress={onPress}>
        <Image source={image} style={styles.buttonImage} />
    </TouchableOpacity>
);


interface LoadingBarProps {
    fill: number;
    color: string; 
}

const LoadingBar: React.FC<LoadingBarProps> = ({ fill, color }) => (
    <View style={styles.loadingBar}>
        {[...Array(6)].map((_, index) => {
            const isFilled = index < fill;
            const partialFill = index === Math.floor(fill);
            const fillWidth = partialFill ? (fill - index) * 100 : 100;

            return (
                <View key={index} style={styles.loadingBarNotch}>
                    {isFilled && (
                        <View
                            style={{
                                backgroundColor: color,
                                width: partialFill ? `${fillWidth}%` : '100%',
                                height: '100%',
                            }}
                        />
                    )}
                </View>
            );
        })}
    </View>
);


const App: React.FC = () => {
    React.useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    const [bStats, setBStats] = React.useState<any>({
        members: [""],
        speedGnd: 0,
        speedWtr: 0,
        speedAir: 0,
        speedGrv: 0,
        acceleration: 0,
        weight: 0,
        handlingGnd: 0,
        handlingWtr: 0,
        handlingAir: 0,
        handlingGrv: 0,
        traction: 0,
        miniturbo: 0,
        invincibility: 0,
    });
    const [dStats, setDStats] = React.useState<any>(bStats);
    const [gStats, setGStats] = React.useState<any>(dStats);
    const [tStats, setTStats] = React.useState<any>(gStats);
    const [selectedStats, setSelectedStats] = React.useState<any>(bStats); // Add state for the selected part's stats

    const [driverGridVisible, setDriverGridVisible] = React.useState<boolean>(true);
    const [bodyGridVisible, setBodyGridVisible] = React.useState<boolean>(true);
    const [tireGridVisible, setTireGridVisible] = React.useState<boolean>(true);
    const [gliderGridVisible, setGliderGridVisible] = React.useState<boolean>(true);
    const [statsVisible, setStatsVisible] = React.useState<boolean>(true);

    const onBodyBtnClick = (body: string) => {
        setBStats(onPartBtnClick(body, bodyStats));
        setCombinedStats();
    }
    const onDriverBtnClick = (driver: string) => {
        setDStats(onPartBtnClick(driver, driverStats));
        setCombinedStats();
    }
    const onGliderBtnClick = (glider: string) => {
        setGStats(onPartBtnClick(glider, gliderStats));
        setCombinedStats();
    }
    const onTireBtnClick = (tire: string) => {
        setTStats(onPartBtnClick(tire, tireStats));
        setCombinedStats();
    }

    const onPartBtnClick = (partName: string, partStatsJsonObj: Object) => {
        // Remove ./##_, replace _ with spaces, and remove .png
        partName = partName.slice(5).replace(/_/g, ' ').slice(0, -4);
        
        // Get stats for the character
        let partStatsObj = null;
        for (const partClass in partStatsJsonObj) {
            // @ts-ignore
            partStatsObj = partStatsJsonObj[partClass];
            // @ts-ignore
            if (partStatsObj.members.indexOf(partName) !== -1)
                break;
        }
        return partStatsObj;
    }

    const setCombinedStats = () => {
        setSelectedStats({
            speedGnd: (bStats.speedGnd || 0) + (dStats.speedGnd || 0) + (gStats.speedGnd || 0) + (tStats.speedGnd || 0),
            speedWtr: (bStats.speedWtr || 0) + (dStats.speedWtr || 0) + (gStats.speedWtr || 0) + (tStats.speedWtr || 0),
            speedAir: (bStats.speedAir || 0) + (dStats.speedAir || 0) + (gStats.speedAir || 0) + (tStats.speedAir || 0),
            speedGrv: (bStats.speedGrv || 0) + (dStats.speedGrv || 0) + (gStats.speedGrv || 0) + (tStats.speedGrv || 0),
            acceleration: (bStats.acceleration || 0) + (dStats.acceleration || 0) + (gStats.acceleration || 0) + (tStats.acceleration || 0),
            weight: (bStats.weight || 0) + (dStats.weight || 0) + (gStats.weight || 0) + (tStats.weight || 0),
            handlingGnd: (bStats.handlingGnd || 0) + (dStats.handlingGnd || 0) + (gStats.handlingGnd || 0) + (tStats.handlingGnd || 0),
            handlingWtr: (bStats.handlingWtr || 0) + (dStats.handlingWtr || 0) + (gStats.handlingWtr || 0) + (tStats.handlingWtr || 0),
            handlingAir: (bStats.handlingAir || 0) + (dStats.handlingAir || 0) + (gStats.handlingAir || 0) + (tStats.handlingAir || 0),
            handlingGrv: (bStats.handlingGrv || 0) + (dStats.handlingGrv || 0) + (gStats.handlingGrv || 0) + (tStats.handlingGrv || 0),
            traction: (bStats.traction || 0) + (dStats.traction || 0) + (gStats.traction || 0) + (tStats.traction || 0),
            miniturbo: (bStats.miniturbo || 0) + (dStats.miniturbo || 0) + (gStats.miniturbo || 0) + (tStats.miniturbo || 0),
            invincibility: (bStats.invincibility || 0) + (dStats.invincibility || 0) + (gStats.invincibility || 0) + (tStats.invincibility || 0)
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./img/bg.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <ScrollView contentContainerStyle={styles.content}>

                    <TouchableOpacity
                        onPress={() => {
                            configureAnimation();
                            setDriverGridVisible(!driverGridVisible);
                        }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Drivers</Text>
                        </View>
                    </TouchableOpacity>
                    {driverGridVisible && (
                        <View style={styles.grid}>
                            {drivers.keys().map((driver: string, index: number) => {
                                const currentDriverStats = onPartBtnClick(driver, driverStats);
                                return (
                                    <SquareButton
                                        key={index}
                                        image={drivers(driver)}
                                        onPress={() => onDriverBtnClick(driver)}
                                        selected={JSON.stringify(dStats) === JSON.stringify(currentDriverStats)}
                                    />
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            configureAnimation();
                            setBodyGridVisible(!bodyGridVisible);
                        }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Bodies</Text>
                        </View>
                    </TouchableOpacity>
                    {bodyGridVisible && (
                        <View style={styles.grid}>
                            {bodies.keys().map((body: string, index: number) => {
                                const currentBodyStats = onPartBtnClick(body, bodyStats);
                                return (
                                    <SquareButton
                                        key={index}
                                        image={bodies(body)}
                                        onPress={() => onBodyBtnClick(body)}
                                        selected={JSON.stringify(bStats) === JSON.stringify(currentBodyStats)}
                                    />
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            configureAnimation();
                            setTireGridVisible(!tireGridVisible);
                        }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Tires</Text>
                        </View>
                    </TouchableOpacity>
                    {tireGridVisible && (
                        <View style={styles.grid}>
                            {tires.keys().map((tire: string, index: number) => {
                                const currentTireStats = onPartBtnClick(tire, tireStats);
                                return (
                                    <SquareButton
                                        key={index}
                                        image={tires(tire)}
                                        onPress={() => onTireBtnClick(tire)}
                                        selected={JSON.stringify(tStats) === JSON.stringify(currentTireStats)}
                                    />
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            configureAnimation();
                            setGliderGridVisible(!gliderGridVisible);
                        }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Gliders</Text>
                        </View>
                    </TouchableOpacity>
                    {gliderGridVisible && (
                        <View style={styles.grid}>
                            {gliders.keys().map((glider: string, index: number) => {
                                const currentGliderStats = onPartBtnClick(glider, gliderStats);
                                return (
                                    <SquareButton
                                        key={index}
                                        image={gliders(glider)}
                                        onPress={() => onGliderBtnClick(glider)}
                                        selected={JSON.stringify(gStats) === JSON.stringify(currentGliderStats)}
                                    />
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            configureAnimation();
                            setStatsVisible(!statsVisible);
                        }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Stats</Text>
                        </View>
                    </TouchableOpacity>
                    {statsVisible && (
                        <View>
                            <Text style={styles.subFooterText}>Speed (Ground, Water, Air, Anti-Gravity)</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.speedGnd} color="orange" />}
                            {selectedStats && <LoadingBar fill={selectedStats.speedWtr} color="blue" />}
                            {selectedStats && <LoadingBar fill={selectedStats.speedAir} color="green" />}
                            {selectedStats && <LoadingBar fill={selectedStats.speedGrv} color="purple" />}
                            <Text style={styles.subFooterText}>Acceleration</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.acceleration} color="blue" />}
                            <Text style={styles.subFooterText}>Weight</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.weight} color="blue" />}
                            <Text style={styles.subFooterText}>Handling (Ground, Water, Air, Anti-Gravity)</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.handlingGnd} color="orange" />}
                            {selectedStats && <LoadingBar fill={selectedStats.handlingWtr} color="blue" />}
                            {selectedStats && <LoadingBar fill={selectedStats.handlingAir} color="green" />}
                            {selectedStats && <LoadingBar fill={selectedStats.handlingGrv} color="purple" />}
                            <Text style={styles.subFooterText}>Traction (Grip)</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.traction} color="blue" />}
                            <Text style={styles.subFooterText}>Mini-Turbo</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.miniturbo} color="blue" />}
                            <Text style={styles.subFooterText}>Invincibility</Text>
                            {selectedStats && <LoadingBar fill={selectedStats.invincibility} color="blue" />}
                        </View>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default App;
