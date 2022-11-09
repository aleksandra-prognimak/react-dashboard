import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const getFromLS = (key) => {
  let ls = {};

  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }

  return ls[key];
};

const originalLayouts = getFromLS("layouts") || {};

const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
};

const BasicLayout = () => {
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const resetLayout = () => {
    setLayouts({});
  };

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  };

  return (
    <div>
      <button onClick={() => resetLayout()}>Reset Layout</button>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        <div key="1" data-grid={{ w: 4, h: 8, x: 0, y: 0, minW: 2, minH: 8 }}>
          <span className="text">1</span>
        </div>
        <div key="2" data-grid={{ w: 4, h: 8, x: 4, y: 0, minW: 2, minH: 8 }}>
          <span className="text">2</span>
        </div>
        <div key="3" data-grid={{ w: 4, h: 8, x: 8, y: 0, minW: 2, minH: 8 }}>
          <span className="text">3</span>
        </div>
        <div key="4" data-grid={{ w: 4, h: 8, x: 0, y: 1, minW: 2, minH: 8 }}>
          <span className="text">4</span>
        </div>
        <div key="5" data-grid={{ w: 4, h: 8, x: 4, y: 1, minW: 2, minH: 8 }}>
          <span className="text">5</span>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default BasicLayout;

/* 
  const generateLayout = () => {
    const p = props;
    return _.map(new Array(p.items), (item, i) => {
      const minW = 2;
      const minH = 4;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * 1,
        w: 2,
        h: 6,
        i: i.toString(),
        minW,
        minH,
      };
    });
  }

  const generateDOM = () => {
    return _.map(_.range(props.items), item => {
      return (
        <div key={item}>
          <Item item={item} />
        </div>
      );
    });
  }
*/
