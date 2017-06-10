
var options = {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    //scene3DOnly: true,
    clock: new Cesium.Clock({
        startTime: Cesium.JulianDate.fromIso8601('2017-05-10T12:00:00Z'),
        canAnimate: false
    }),

    // Bing地图影像服务
    // imageryProvider: new Cesium.BingMapsImageryProvider({
    // url: 'https://dev.virtualearth.net',
    // key: 'ApBGk4ITPkE3SNeeE-2EIpW103i0fInzPnKS0K4rT5RrW-v9WnLSFT80caL96zh3',
    // mapStyle: Cesium.BingMapsStyle.AERIAL
    // }),

    // 天地图全球影像服务
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: "http://{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
        layer: "img",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "c",
        credit: new Cesium.Credit("天地图全球影像服务"),
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18,
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        tileDiscardPolicy: new Cesium.DiscardMissingTileImagePolicy({
            missingImageUrl: "http://t0.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix=19&TileRow=0&TileCol=0&style=default&format=tiles",
            pixelsToCheck: [new Cesium.Cartesian2(0, 0), new Cesium.Cartesian2(120, 140), new Cesium.Cartesian2(130, 160), new Cesium.Cartesian2(200, 50), new Cesium.Cartesian2(200, 200)],
            disableCheckIfAllPixelsAreTransparent: true
        })
    }),

    // STK Terrain Service
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    // url : '//assets.agi.com/stk-terrain/world'
    // // requestVertexNormals: true,
    // // requestWaterMask: true
    // }),
    useDefaultRenderLoop: true,
    targetFrameRate: 30,
    showRenderLoopErrors: true,
    automaticallyTrackDataSourceClocks: false,
    contextOptions: {},
    sceneMode: Cesium.SceneMode.SCENE3D,
    //globe: false,
    orderIndependentTranslucency: true,
    creditContainer: 'creditContainer'
    //dataSources: new Cesium.DataSourceCollection(),
    //terrainExaggeration: 1,
    //shadows: true,
    //terrainShadows: Cesium.ShadowMode.ENABLED
};

var viewer = new Cesium.Viewer('ViewerContainer', options);
viewer.scene.globe.depthTestAgainstTerrain = true;

// 全球影像中文注记服务（叠加图层）
viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://{s}.tianditu.com/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
    layer: "cia",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "c",
    maximumLevel: 18,
    credit: new Cesium.Credit("全球影像中文注记服务"),
    subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    tilingScheme: new Cesium.GeographicTilingScheme(),
    tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
}));
