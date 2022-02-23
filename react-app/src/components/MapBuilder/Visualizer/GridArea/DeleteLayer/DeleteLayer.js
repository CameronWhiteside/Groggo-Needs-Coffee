import './DeleteLayer.css'
import { resetRoadOverlay, addPathLine } from '../../../utils'
import { removeFeature } from '../../../../../store/feature'
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

const DeleteLayer = (
    { height,
        width,
        nodeSize,
        activeControl,
        currentMap,
        currentFeatures
    }) => {

    const dispatch = useDispatch();

    let startX = 0
    let startY = 0
    let stopX = 0
    let stopY = 0
    let featureWidth, featureHeight, featureTop, featureLeft, boxY, boxX
    let drawingActive = false
    let deleteLayer = document.getElementById('delete-layer')
    let existingTrackers = document.getElementById('delete-tracker')
    if (existingTrackers) {
        deleteLayer.innerHTML = ''
    }

    const removeFromMap = (e) => {
        resetRoadOverlay()
        let featureId = e.target.getAttribute('featureId')
        dispatch(removeFeature(featureId))

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fakifyFeatures() {



        let deleteTracker = document.createElement('div');
        deleteTracker.id = 'delete-tracker';
        deleteLayer.appendChild(deleteTracker);

        for (let i = 0; i < currentFeatures.length; i++) {
            let {
                featureTypeId, id, startLatitude, stopLatitude, startLongitude, stopLongitude
            } = currentFeatures[i];

            if (featureTypeId > 5) {
                let newFeature = document.createElement('div');
                newFeature.id = `${id}-delete`;
                newFeature.style.position = 'absolute';
                newFeature.style.width = `${(Math.abs(startLongitude - stopLongitude) + 1) * nodeSize}px`;
                newFeature.style.height = `${(Math.abs(startLatitude - stopLatitude) + 1) * nodeSize}px`;
                newFeature.style.left = `${startLongitude * nodeSize}px`;
                newFeature.style.top = `${startLatitude * nodeSize}px`;
                newFeature.setAttribute('featureTypeId', featureTypeId);
                newFeature.setAttribute('featureId', id);
                newFeature.addEventListener('mousedown', removeFromMap);
                if (featureTypeId === 7)
                    newFeature.classList.add('delete-water');
                if (featureTypeId === 6)
                    newFeature.classList.add('delete-brush');
                deleteTracker.appendChild(newFeature);
            }

            if (parseInt(featureTypeId) === 5) {
                let startNode = document.createElement('div');
                startNode.id = `${id}-delete-start`;
                startNode.style.left = `${startLongitude * nodeSize}px`;
                startNode.style.top = `${startLatitude * nodeSize}px`;
                startNode.style.width = `${nodeSize}px`;
                startNode.style.height = `${nodeSize}px`;
                startNode.classList.add(`handle-${featureTypeId}`);
                startNode.classList.add('delete-handle');
                startNode.setAttribute('featureTypeId', featureTypeId);
                startNode.setAttribute('featureId', id);
                startNode.addEventListener('mousedown', removeFromMap);
                let stopNode = document.createElement('div');
                stopNode.id = `${id}-delete-stop`;
                stopNode.style.left = `${stopLongitude * nodeSize}px`;
                stopNode.style.top = `${stopLatitude * nodeSize}px`;
                stopNode.style.width = `${nodeSize}px`;
                stopNode.style.height = `${nodeSize}px`;
                stopNode.classList.add(`handle-${featureTypeId}`);
                stopNode.classList.add('delete-handle');
                stopNode.setAttribute('featureTypeId', featureTypeId);
                stopNode.setAttribute('featureId', id);
                stopNode.addEventListener('mousedown', removeFromMap);
                deleteTracker.appendChild(startNode);
                deleteTracker.appendChild(stopNode);
                addPathLine(startNode, stopNode, 'delete-tracker', `delete-street`, '18', `${id}-delete`);
                document.getElementById(`${id}-delete`).setAttribute('featureId', id);
                document.getElementById(`${id}-delete`).addEventListener('mousedown', removeFromMap)
            }
        }
    }


    useEffect(() => {
        fakifyFeatures()
    }, [currentFeatures, fakifyFeatures])


    return (
        <>
        </>
    )

}

export default DeleteLayer
