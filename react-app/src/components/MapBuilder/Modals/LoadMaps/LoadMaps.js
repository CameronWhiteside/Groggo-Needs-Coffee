import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMaps } from '../../../../store/map';
import Modal from '../Modal'
import MapCard from './MapCard';
import './LoadMaps.css'

const LoadMaps = ({
    loadMapMode,
    setLoadMapMode,
    setCurrentMap,
    setCurrentName,
    featureList,
    setFeatureList,

}) => {

    const dispatch = useDispatch()
    const currentMaps = useSelector(state => state.map);
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getMaps(sessionUser.id))
    }, []);


            return(
                <Modal
                    mode={loadMapMode}
                    setMode={setLoadMapMode}
                    width={700}
                >
                    {currentMaps &&

                        <div className='maps-list'>
                            {Object.values(currentMaps).map(map => (
                                <MapCard
                                    setCurrentMap={setCurrentMap}
                                    setCurrentName={setCurrentName}
                                    featureList={featureList}
                                    setFeatureList={setFeatureList}
                                    key={map.id}
                                    map={map}

                                />
                            ))}
                        </div>
                    }
                        {(!currentMaps || currentMaps.length <= 0) &&
                            <>
                                <h3 className='modal-title load'>Ope.</h3>
                                <h5 className='modal-warning'>You haven't made any maps yet, you lil' baby cartographer you. Go explore the world! And map it, too. And save those maps, so you can load them here.
                                </h5>
                            </>
                        }
                </Modal>
            )
        }

    export default LoadMaps
