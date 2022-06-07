import React, { useState } from 'react';
import { StyleSheet, Modal, View, Image, FlatList, TextInput, Dimensions, Platform } from 'react-native';
import { useColorMode, useTheme, Box, Text, Pressable, Radio } from 'native-base';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import myPlanData from '../json/myPlan.json';
import { AddButton } from '../components/AddButton';
import { ActionButton } from '../components/ActionButton';
import { MyPlan } from '../components/MyPlan';
import { PlannerHeader } from '../components/Header';
import { formatDate } from '../utils/formatter';

const PlannerScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [isAsigned, setIsAssigned] = useState(true);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [day, setDay] = useState(1);

    const SegmentedContent = () => {
        if (selectedIndex == 0) {
            return <MyPlanList />;
        } else if (selectedIndex == 1) {
            return <SharedPlan />;
        } else if (selectedIndex == 2) {
            return <SavedPlan />;
        }
    };

    const MyPlanList = () => {
        const renderItem = ({ item }) => {
            return <MyPlan item={item} navigation={navigation} />;
        };

        return (
            <Box style={styles.planWrapper}>
                <FlatList
                    data={myPlanData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 280 }}
                />
            </Box>
        );
    };

    const SharedPlan = () => {
        return (
            <Box style={styles.planWrapper}>
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無共用行程</Text>
                </Box>
            </Box>
        );
    };

    const SavedPlan = () => {
        return (
            <Box style={styles.planWrapper}>
                <Box style={styles.planNullBox}>
                    <Text style={styles.planNullText}>目前無收藏行程</Text>
                </Box>
            </Box>
        );
    };

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleStartConfirm = (date) => {
        setStartDate(date);
        hideStartDatePicker();
    };
    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const handleNextStep = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('PlanDetailScreen');
    };

    return (
        <Box style={styles.container} _dark={{ bg: colors.dark[50] }} _light={{ bg: colors.dark[600] }}>
            <PlannerHeader navigation={navigation} onPress={null} />
            <SegmentedControl
                values={['我的行程', '共用行程', '收藏行程']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
                style={styles.segmentedControlStyle}
                fontStyle={{
                    fontSize: 14,
                    color: colorMode === 'dark' ? colors.dark[300] : colors.dark[200],
                }}
                activeFontStyle={{
                    fontSize: 14,
                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                }}
                // tintColor={colorMode === "dark" ? colors.secondary[100] : '#fff'}
                // backgroundColor={colorMode === "dark" ? colors.dark[200] : colors.secondary[50]}
                appearance={colorMode === 'dark' ? 'dark' : 'light'}
            />
            <SegmentedContent />
            <AddButton size={'large'} style={styles.fabWrapper} onPress={() => setModalVisible(true)} />
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View
                        style={[
                            styles.modalView,
                            {
                                backgroundColor: colorMode === 'dark' ? colors.dark[100] : '#fff',
                            },
                        ]}
                    >
                        <Box
                            style={[
                                styles.modalHeader,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: colorMode === 'dark' ? colors.dark[200] : colors.dark[500],
                                },
                            ]}
                        >
                            <Text style={styles.modalHeaderText}>建立行程</Text>
                            <Pressable style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
                                <MaterialIcon
                                    name="close"
                                    size={24}
                                    color={colorMode === 'dark' ? '#fff' : '#484848'}
                                />
                            </Pressable>
                        </Box>
                        <Box style={styles.modalContent}>
                            <Box style={styles.imageWrapper}>
                                <Image src={null} style={styles.image} />
                            </Box>
                            <Text style={styles.modalLabel}>行程名稱</Text>
                            <Box
                                style={[
                                    styles.inputWrapper,
                                    {
                                        width: Dimensions.get('window').width - 48,
                                        borderColor: colors.secondary[200],
                                    },
                                ]}
                            >
                                <TextInput
                                    placeholder="行程名稱"
                                    placeholderTextColor={colors.dark[400]}
                                    value={title}
                                    onChangeText={(text) => setTitle(text)}
                                    returnKeyType="done"
                                />
                            </Box>
                            <Radio.Group
                                style={{ marginVertical: 20 }}
                                colorScheme="gray"
                                name="AsignDate"
                                value={isAsigned}
                                onChange={(nextValue) => {
                                    setIsAssigned(nextValue);
                                }}
                            >
                                <Radio value={true} size="sm" style={styles.radioOption}>
                                    <Text style={styles.radioText}>指定日期</Text>
                                </Radio>
                                <Radio value={false} size="sm" style={styles.radioOption}>
                                    <Text style={styles.radioText}>不指定日期</Text>
                                </Radio>
                            </Radio.Group>
                            {isAsigned === true ? (
                                <Box>
                                    <Text style={styles.modalLabel}>日期</Text>
                                    <Box style={styles.dateWrapper}>
                                        <Pressable
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                            style={styles.dateBox}
                                            onPress={showStartDatePicker}
                                        >
                                            <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                                {formatDate(startDate)}
                                            </Text>
                                        </Pressable>
                                        <Box
                                            _dark={{ bg: colors.dark[600] }}
                                            _light={{ bg: colors.dark[200] }}
                                            style={styles.dateDivider}
                                        ></Box>
                                        <Pressable
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                            style={styles.dateBox}
                                            onPress={showEndDatePicker}
                                        >
                                            <Text color={colorMode === 'dark' ? colors.dark[600] : colors.dark[200]}>
                                                {formatDate(endDate)}
                                            </Text>
                                        </Pressable>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Text style={styles.modalLabel}>天數</Text>
                                    <Box style={styles.daysWrapper}>
                                        <Text>預計共</Text>
                                        <Pressable
                                            style={styles.dayBox}
                                            _dark={{ bg: colors.dark[200] }}
                                            _light={{ bg: colors.secondary[50] }}
                                            onPress={null}
                                        >
                                            <RNPickerSelect
                                                placeholder={{}}
                                                onValueChange={(value) => setDay(value)}
                                                items={[
                                                    { label: '1', value: 1 },
                                                    { label: '2', value: 2 },
                                                    { label: '3', value: 3 },
                                                    { label: '4', value: 4 },
                                                    { label: '5', value: 5 },
                                                    { label: '6', value: 6 },
                                                    { label: '7', value: 7 },
                                                    { label: '8', value: 8 },
                                                    { label: '9', value: 9 },
                                                    { label: '10', value: 10 },
                                                ]}
                                                style={{
                                                    placeholder: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[300] : colors.dark[400],
                                                    },
                                                    color: colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    inputAndroid: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    },
                                                    inputIOS: {
                                                        color:
                                                            colorMode === 'dark' ? colors.dark[600] : colors.dark[200],
                                                    },
                                                    viewContainer: { justifyContent: 'center' },
                                                    inputIOSContainer: { alignItems: 'center' },
                                                }}
                                            />
                                        </Pressable>
                                        <Text>天</Text>
                                    </Box>
                                </Box>
                            )}

                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                onConfirm={handleStartConfirm}
                                onCancel={hideStartDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                onConfirm={handleEndConfirm}
                                onCancel={hideEndDatePicker}
                            />
                        </Box>
                        <ActionButton
                            text={'下一步'}
                            style={{ marginTop: 60 }}
                            onPress={() => handleNextStep()}
                            navigation={navigation}
                        />
                    </View>
                </Modal>
            </View>
        </Box>
    );
};

export default PlannerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    segmentedControlStyle: {
        width: '80%',
        height: 32,
        marginTop: 10,
        marginBottom: 25,
    },
    fabWrapper: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
    modalView: {
        width: '100%',
        height: Platform.OS === 'ios' ? '95%' : '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        width: '100%',
        height: 45,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: '500',
    },
    modalClose: {
        position: 'absolute',
        right: 0,
    },
    imageWrapper: {
        width: 340,
        height: 190,
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    radioOption: {
        marginTop: 5,
    },
    radioText: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 12,
    },
    inputWrapper: {
        height: 36,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBox: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 5,
    },
    dateDivider: {
        width: 16,
        height: 2,
        marginHorizontal: 10,
    },
    daysWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayBox: {
        paddingVertical: 6,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    planWrapper: {
        alignItems: 'center',
    },
    planNullBox: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planNullText: {
        fontSize: 16,
        color: '#969696',
    },
});
