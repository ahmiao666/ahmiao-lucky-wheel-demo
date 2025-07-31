import React, { useRef, useState, useCallback } from "react";
import { ReactLuckyWheel, type WheelConfig, type SectorConfig, type ReactLuckyWheelRef } from "@ahmiao666/lucky-wheel-react";
import "./App.css";

function App() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string>("");
  const wheelRef = useRef<ReactLuckyWheelRef>(null);

  // 转盘配置（固定配置，不再动态更新）
  const wheelConfig: WheelConfig = {
    sectors: [
      {
        id: "1",
        text: "超级大奖",
        color: "#FF6B6E",
        textConfig: {
          fontSize: 16,
          color: "#fff",
          textAlign: "center",
        },
      },
      {
        id: "2",
        text: "二等奖",
        color: "#4ECDC4",
      },
      {
        id: "3",
        text: "三等奖",
        color: "#45B7D1",
      },
      {
        id: "4",
        text: "四等奖",
        color: "#96CEB4",
      },
      {
        id: "5",
        text: "五等奖",
        color: "#FFEAA7",
      },
      {
        id: "6",
        text: "六等奖",
        color: "#DDA0DD",
      },
      {
        id: "7",
        text: "鼓励奖",
        color: "#6A0572",
      },
      {
        id: "8",
        text: "谢谢参与",
        color: "#FF9FF3",
      },
    ],
    size: 400,
    targetDirection: 0,
    stopOffsetRange: 0.6,
    arrow: {
      size: 20,
      color: "#333333",
      distance: 220,
    },
    border: {
      width: 5,
      color: "#ff0000",
      style: "solid",
    },
    centerButton: {
      visible: true,
      animation: true,
      width: 60,
      height: 60,
      backgroundColor: "#ffffff",
      border: {
        width: 3,
        color: "#333333",
        style: "solid",
      },
      arrow: {
        size: 20,
        color: "#333333",
        offsetY: -35,
      },
    },
  };

  // 转盘事件处理
  const handleStart = useCallback(() => {
    setSpinning(true);
    setResult("");
  }, []);

  const handleStop = useCallback((sector: SectorConfig) => {
    setSpinning(false);
    setResult(`🎉 恭喜您获得：${sector.text}！`);
  }, []);

  const handleCenterButtonClick = () => {
    handleManualStart();
    setTimeout(() => {
      handleManualStop("1");
    }, 3000);
  };
  // 手动开始转盘
  const handleManualStart = () => {
    wheelRef.current.start();
  };

  // 手动停止转盘
  const handleManualStop = (sectorId: string) => {
    console.log(sectorId, "sectorId");
    wheelRef.current.stop(sectorId);
  };

  // 自动演示（3秒后自动停止）
  const handleAutoDemo = () => {
    handleManualStart();
    setTimeout(() => {
      handleManualStop("3");
    }, 3000);
  };

  return (
    <div className={`app ${spinning ? "spinning" : ""}`}>
      <h1 className="title">🎯 幸运大转盘 - 简化演示</h1>

      {/* 结果显示 */}
      <div className={`result ${spinning ? "spinning" : result ? "success" : ""}`}>
        {spinning ? "🎲 转盘转动中..." : result || "点击中心按钮或控制按钮开始转盘"}
      </div>

      {/* 控制按钮 */}
      <div className="controls">
        <button className="btn btn-start" onClick={handleManualStart}>
          开始转盘
        </button>
        <button className="btn btn-stop" onClick={() => handleManualStop("2")}>
          停止转盘
        </button>
        <button className="btn btn-auto" onClick={handleAutoDemo}>
          自动演示
        </button>
      </div>

      {/* 转盘画布 */}
      <div className="canvas-container">
        <div className="canvas-box">
          <ReactLuckyWheel ref={wheelRef} config={wheelConfig} onStart={handleStart} onStop={handleStop} onCenterButtonClick={handleCenterButtonClick} />
        </div>
      </div>

      {/* 奖品列表 */}
      <div className="config-panel">
        <div className="config-section">
          <h3>🏆 奖品列表</h3>
          <div className="sector-list">
            {wheelConfig.sectors.map((sector: SectorConfig) => (
              <div key={sector.id} className="sector-item">
                <div className="sector-header">
                  <div className="sector-color" style={{ backgroundColor: sector.color }}></div>
                  <div className="sector-text">{sector.text}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>ID: {sector.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 使用提示 */}
      <div className="tip">
        <p>🎮 使用说明：</p>
        <p>• 点击中心按钮或"开始转盘"按钮开始转动</p>
        <p>• 点击"停止转盘"按钮手动停止</p>
        <p>• 点击"自动演示"体验3秒自动停止</p>
        <p>• 转盘会指定停在2号奖品上</p>
      </div>
    </div>
  );
}

export default App;
