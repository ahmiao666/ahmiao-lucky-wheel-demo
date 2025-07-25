<script setup lang="ts">
import { ref, reactive } from "vue";
import { VueLuckyWheel } from "@ahmiao666/lucky-wheel-vue";
import type { WheelConfig, VueLuckyWheelRef } from "@ahmiao666/lucky-wheel-vue";

// 响应式状态
const spinning = ref(false);
const result = ref<string>("");
const wheelRef = ref<VueLuckyWheelRef | null>(null);

// 转盘配置（固定配置，不再动态更新）
const wheelConfig: WheelConfig = reactive({
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
  targetDirection: 0,
  stopOffsetRange: 0.6,
  canvasPadding: 50,
  arrow: {
    size: 20,
    color: "#333333",
    distance:230,
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
      size: 15,
      color: "#333333",
    },
  },
});

// 转盘事件处理
const handleStart = () => {
  spinning.value = true;
  result.value = "";
};

const handleStop = (sector: SectorConfig) => {
  spinning.value = false;
  result.value = `🎉 恭喜您获得：${sector.text}！`;
};

const handleCenterButtonClick = () => {
  wheelRef.value.start();

  setTimeout(() => {
    handleManualStop();
  });
};

// 手动开始转盘
const handleManualStart = () => {
  wheelRef.value.start();
};

// 手动停止转盘
const handleManualStop = () => {
  wheelRef.value.stop("2");
};

// 自动演示（3秒后自动停止）
const handleAutoDemo = () => {
  handleManualStart();
  setTimeout(() => {
    handleManualStop();
  }, 3000);
};
</script>

<template>
  <div :class="['app', spinning ? 'spinning' : '']">
    <h1 class="title">🎯 幸运大转盘 - Vue 简化演示</h1>

    <!-- 结果显示 -->
    <div :class="['result', spinning ? 'spinning' : result ? 'success' : '']">
      {{ spinning ? "🎲 转盘转动中..." : result || "点击中心按钮或控制按钮开始转盘" }}
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button class="btn btn-start" @click="handleManualStart">开始转盘</button>
      <button class="btn btn-stop" @click="handleManualStop">停止转盘</button>
      <button class="btn btn-auto" @click="handleAutoDemo">自动演示</button>
    </div>

    <!-- 转盘画布 -->
    <div class="canvas-container">
      <div class="canvas-box">
        <VueLuckyWheel
          ref="wheelRef"
          :config="wheelConfig"
          @start="handleStart"
          @stop="handleStop"
          @center-button-click="handleCenterButtonClick"
        />
      </div>
    </div>

    <!-- 奖品列表 -->
    <div class="config-panel">
      <div class="config-section">
        <h3>🏆 奖品列表</h3>
        <div class="sector-list">
          <div v-for="sector in wheelConfig.sectors" :key="sector.id" class="sector-item">
            <div class="sector-header">
              <div class="sector-color" :style="{ backgroundColor: sector.color }"></div>
              <div class="sector-text">{{ sector.text }}</div>
            </div>
            <div style="font-size: 12px; color: #666">ID: {{ sector.id }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div class="tip">
      <p>🎮 使用说明：</p>
      <p>• 点击中心按钮或"开始转盘"按钮开始转动</p>
      <p>• 点击"停止转盘"按钮手动停止</p>
      <p>• 点击"自动演示"体验3秒自动停止</p>
      <p>• 转盘会指定停在2号奖品上</p>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.result {
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  min-height: 20px;
  color: #000;
}

.result.success {
  color: #2ecc71;
  animation: bounce 0.5s ease-out;
}

.result.spinning {
  color: #666;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.btn {
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: bold;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-start {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
}

.btn-stop {
  background: linear-gradient(45deg, #f44336, #d32f2f);
  color: white;
}

.btn-auto {
  background: linear-gradient(45deg, #2196f3, #1976d2);
  color: white;
}

.canvas-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.canvas-box {
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.config-panel {
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.config-section {
  margin-bottom: 25px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  border-left: 4px solid #2196f3;
}

.config-section h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.2rem;
}

.sector-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.sector-item {
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 2px solid #eee;
  transition: all 0.2s ease;
}

.sector-item:hover {
  border-color: #2196f3;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
}

.sector-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.sector-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.sector-text {
  font-weight: bold;
  color: #333;
}

.tip {
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.6;
}

.spinning .canvas-container {
  animation: pulse 1s ease-in-out infinite;
}
</style>
