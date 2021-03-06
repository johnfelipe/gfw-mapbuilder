import resources from 'resources';


test('resources has the required properties', () => {

  expect(resources).toHaveProperty('webmap');
  expect(resources).toHaveProperty('title');
  expect(resources).toHaveProperty('language');

  expect(resources).not.toHaveProperty('Lucas');

  if (resources.useAlternativeLanguage) {
    expect(resources).toHaveProperty('alternativeLanguage');
    expect(resources.alternativeLanguage).toBeDefined();
    expect(resources.alternativeLanguage).toBeTruthy();
  }

  if (resources.initialExtent) {
    const { initialExtent } = resources;
    expect(typeof resources.initialExtent).toBe('object');
    expect(resources.initialExtent).toHaveProperty('x');
    expect(resources.initialExtent).toHaveProperty('y');
    expect(resources.initialExtent).toHaveProperty('z');

    if (initialExtent.x && initialExtent.y && initialExtent.z) {
      expect(typeof resources.initialExtent.x).toBe('number');
      expect(typeof resources.initialExtent.y).toBe('number');
      expect(typeof resources.initialExtent.z).toBe('number');

      expect(resources.initialExtent.x).toBeGreaterThanOrEqual(-180);
      expect(resources.initialExtent.x).toBeLessThan(180);

      expect(resources.initialExtent.y).toBeGreaterThanOrEqual(-90);
      expect(resources.initialExtent.y).toBeLessThan(90);

      expect(resources.initialExtent.z).toBeGreaterThanOrEqual(1);
      expect(resources.initialExtent.z).toBeLessThan(21);
    }

  }

  if (resources.includeCartoTemplateLayers) {
    expect(resources).toHaveProperty('cartoTemplateId');
    expect(resources).toHaveProperty('cartoApiKey');
    expect(resources).toHaveProperty('cartoGroupLabel');
    expect(resources.cartoGroupLabel).toHaveProperty(resources.language);
  }

  expect(resources).toHaveProperty('layerPanel');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.label');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.layers');
  expect(resources.layerPanel.GROUP_WEBMAP.layers).toBeInstanceOf(Array);
  expect(resources.layerPanel.GROUP_WEBMAP.layers).toHaveLength(0);

  // expect(resources).toHaveProperty('layerPanel.GROUP_LCD'); //we Are checking for these layers in LossControls & LayerLegend
  // expect(resources).toHaveProperty('layerPanel.GROUP_LCD.layers');
  // expect(resources.layerPanel.GROUP_LCD.layers).toBeInstanceOf(Array);

  // expect(resources).toHaveProperty('layerPanel.GROUP_LC'); //same thing
  // expect(resources).toHaveProperty('layerPanel.GROUP_LC.layers');
  // expect(resources.layerPanel.GROUP_LC.layers).toBeInstanceOf(Array);

  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP'); //same thing
  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP.layers');
  expect(resources.layerPanel.GROUP_BASEMAP.layers).toBeInstanceOf(Array);

  expect(resources).toHaveProperty('layerPanel.extraLayers');
  expect(resources.layerPanel.extraLayers).toBeInstanceOf(Array); //gets concat'ed somewhere!

});

describe('resources layer spec', () => {

  const layerPanelKeys = Object.keys(resources.layerPanel).filter(g => g !== 'GROUP_BASEMAP' && g !== 'GROUP_WEBMAP' && g !== 'extraLayers');
  const allLayers = layerPanelKeys.map(k => resources.layerPanel[k].layers).reduce((acc, current) => [...acc, ...current], []);

  allLayers.forEach((layer) => {
    if (layer.type === 'wms') {
      it('has a layerName property if it is a WMSLayer', () => {
        expect(layer).toHaveProperty('layerName');
        expect(typeof layer.layerName).toBe('string');
      });
    }
    it(`layer ${layer.id} has the required properties`, () => {
      if (layer.type !== 'imagery') {
        expect(layer).toHaveProperty('url');
      }
      expect(layer).toHaveProperty('id');
      expect(layer).toHaveProperty('type');
      expect(layer).toHaveProperty('label');
      expect(layer.label).toHaveProperty(resources.language);
    });
  });

  // resources.layerPanel.GROUP_LCD.layers.forEach((layer) => {
  //   it(`the ${layer.id} layer has the properties we need`, () => {
  //     expect(layer).toHaveProperty('id');
  //     expect(layer).toHaveProperty('type');
  //     expect(layer).toHaveProperty('url');
  //     expect(layer).toHaveProperty('label');
  //     expect(layer.label).toHaveProperty(resources.language);
  //   });
  // });

  // resources.layerPanel.GROUP_LC.layers.forEach((layer) => {
  //   it(`the ${layer.id} layer has the properties we need`, () => {
  //     expect(layer).toHaveProperty('id');
  //     expect(layer).toHaveProperty('type');
  //     expect(layer).toHaveProperty('url');
  //     expect(layer).toHaveProperty('label');
  //     expect(layer.label).toHaveProperty(resources.language);
  //   });
  // });

  resources.layerPanel.GROUP_BASEMAP.layers.forEach((layer) => {
    it(`the ${layer.id} basemap layer has the properties we need`, () => {
      expect(layer).toHaveProperty('id');
      expect(layer).toHaveProperty('thumbnailUrl');
    });
  });
});
