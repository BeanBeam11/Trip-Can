import React from 'react';
import { FlatList, View, Dimensions, RefreshControl } from 'react-native';
import { useColorMode, useTheme, Box, Text } from 'native-base';
import { Plan } from './Plan';
import { Plan_H } from './Plan_H';

const PlanList = ({ navigation, data }) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();

    const renderItem = ({ item }) => {
        return <Plan item={item} navigation={navigation} />;
    };

    const renderListEmpty = () => {
        return (
            <Box style={{ marginTop: 20, width: Dimensions.get('window').width - 48, alignItems: 'center' }}>
                <Text color={colors.dark[300]}>( ×ω× ) 資料整理中...</Text>
            </Box>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            ListEmptyComponent={renderListEmpty}
        />
    );
};

const PlanList_V = ({ navigation, data }) => {
    const renderItem = ({ item }) => {
        return <Plan_H item={item} navigation={navigation} />;
    };

    const renderListFooter = () => <View style={{ width: '100%', height: 80 }}></View>;

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 15 }}
            ListFooterComponent={renderListFooter}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    tintColor={colorMode == 'dark' ? colors.dark[400] : colors.secondary[100]}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export { PlanList, PlanList_V };
