import React, { useEffect, useState } from 'react';
import { useSelector, } from 'react-redux';
import Modal from '../Modal'
import MapCard from './MapCard';
import './LoadMaps.css'

const LoadMaps = ({
    loadMapMode,
    setLoadMapMode,
}) => {

    const sessionUser = useSelector(state => state.session.user);
    const [maps, setMaps] = useState([]);

    useEffect(() => {
          async function fetchMaps() {
            const response = await fetch(`/api/users/${sessionUser.id}/maps`);
            const responseData = await response.json();
            setMaps(responseData.maps);
            }
            fetchMaps();
    }, []);

    const onConfirm = () => {console.log('loading')}
    const onCancel = () => {setLoadMapMode(false)}

            return(
                <Modal
                    mode={loadMapMode}
                    setMode={setLoadMapMode}
                    width={700}
                >
                    {maps.length > 0 &&

                        <div className='maps-list'>
                            <div className='fake-div'></div>
                            {maps.map(map => (
                                <MapCard key={map.id} map={map} />
                            ))}
                        </div>
                    }
                        {(!maps || maps.length <= 0) &&
                            <>
                                <h3 className='modal-title load'>Ope.</h3>
                                <h5 className='modal-warning'>You haven't made any maps yet, you lil' baby cartographer you. Go explore the world! And map it, too. And save those maps, so you can load them here.
                                </h5>
                            </>
                        }
                    {/* <h5 className='modal-warning'>This is not a drill. Once you delete this map, you can't change your mind. It'll be gone forever.
                    </h5>
                    <div className='action-container'>
                    <button
                        className='modal-button delete'
                        onClick={onConfirm}
                        >I Said What I Said.</button>
                    <button
                        className='modal-button delete'
                        onClick={onCancel}
                        >Oh, Nevermind.</button>
                    </div> */}
                </Modal>
            )
        }

    export default LoadMaps
