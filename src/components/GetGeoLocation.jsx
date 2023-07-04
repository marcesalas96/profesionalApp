import { View, Text } from "react-native"
import React, { useEffect, useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';



const GetGeoLocation = ({ location }) => {
    return (
        <>
            {!location ? <></>
                :
                <Text>
                    {console.log(` LATIDUD:${location.latitude}  LONGITUD:${location.longitude}`)}
                    LATIDUD:{location.latitude}  LONGITUD:{location.longitude}
                </Text>
            }
        </>
    )
}
export default GetGeoLocation