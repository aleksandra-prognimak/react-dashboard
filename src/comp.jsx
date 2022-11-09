import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { AreaChartComp } from "./AreaChartComp";
import { BarChartComp } from './BarChartComp';
import { LineChartComp } from "./LineChartComp";

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

export const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
      <button className="button" onClick={() => resetLayout()}>
        Reset Layout
      </button>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        <div key="1" data-grid={{ w: 4, h: 8, x: 0, y: 0, minW: 2, minH: 8 }}>
          <LineChartComp data={data} />
        </div>
        <div key="2" data-grid={{ w: 4, h: 8, x: 4, y: 0, minW: 2, minH: 8 }}>
          <AreaChartComp data={data} />
        </div>
        <div key="3" data-grid={{ w: 4, h: 8, x: 8, y: 0, minW: 2, minH: 8 }}>
          <BarChartComp data={data} />
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
