import React from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import TWEEN from 'tween';

// Gen random data
const N = 300;
const randomData = [...Array(N).keys()].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  alt: Math.random() * 0.8 + 0.1,
  radius: Math.random() * 5,
  color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
}));
console.log('i am random data',randomData);


const { useState, useEffect, useRef } = React;
  
const WorldMapNews = () => {
    
    const [places, setPlaces] = useState([]);
    const globeEl = useRef();
    const [data, setData] = useState(randomData);

    useEffect(() => {
      (function moveSpheres() {
        data.forEach(d => d.lat += 0.2);
        setData(data.slice());
        requestAnimationFrame(moveSpheres);
      })();
    }, []);

    useEffect(() => {
      globeEl.current.pointOfView({
        altitude: 3.5
      });
    }, []);

    // function rotationOn () {

    //   setTimeout(function () {
    //     // Animate build-in just once
        
    //     new TWEEN.Tween({
    //       k: 1e-6
    //     }).to({
    //       k: 1
    //     }, 600).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function (_ref11) {
    //       var k = _ref11.k;
    //       // return state.scene.scale.set(k, k, k);
    //     }).start();
    //     var rotAxis = new THREE.Vector3(0, 1, 0);
    //     new TWEEN.Tween({
    //       rot: Math.PI * 2
    //     }).to({
    //       rot: 0
    //     }, 1200).easing(TWEEN.Easing.Quintic.Out).onUpdate(function (_ref12) {
    //       var rot = _ref12.rot;
    //       return setRotationFromAxisAngle(rotAxis, rot);
    //     }).start();
    //   }, 600); // delay animation slightly to load globe texture
    // }

    function setRotationFromAxisAngle(axis, angle) {

      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

      // assumes axis is normalized

      var halfAngle = angle / 2,
        s = Math.sin(halfAngle);

      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);

      this._onChangeCallback();

      return this;

    }

    useEffect(() => {
      // load data
      fetch('./dataset/ne_110m_populated_places_simple.geojson', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      })
        .then(res => res.json())
        .then(({ features }) => {
            console.log('dumdum',features);
            
            setPlaces(features)
    })
    .catch((err)=> console.log('Cant access url, Error is ',err));
    }, []);
    return (
       <div className="container">
        <div className ="row">
          <div className ="col-lg-8 globe-div">
            <Globe
              ref={globeEl}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              bumpImageUrl = "//unpkg.com/three-globe/example/img/earth-topology.png"
              labelsData={places}
              labelLat={d => d.properties.latitude}
              labelLng={d => d.properties.longitude}
              labelText={d => d.properties.name}
              labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
              labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
              labelColor={() => 'rgba(255, 165, 0, 0.75)'}
              labelResolution={2}
              showAtmosphere={true}
              // customLayerData={data}
              // customThreeObject={d => new THREE.Mesh(
              //   new THREE.SphereBufferGeometry(d.radius),
              //   new THREE.MeshLambertMaterial({ color: d.color })
              // )}
              // customThreeObjectUpdate={(obj, d) => {
              //   Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
              // }}
          />;
          </div>
        </div>
      </div>
    )
  };

  export default WorldMapNews;