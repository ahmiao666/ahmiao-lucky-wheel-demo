# Vue LuckyWheel 组件使用文档

Vue版幸运大转盘组件，基于Canvas实现的高性能、可自定义的抽奖转盘组件。

## 📦 安装

```bash
npm install @ahmiao/lucky-wheel-vue
# 或
yarn add @ahmiao/lucky-wheel-vue
# 或
pnpm add @ahmiao/lucky-wheel-vue
```

## 🚀 快速开始

### 基础用法

```vue
<template>
  <div style="width: 500px; height: 500px; margin: 0 auto;">
    <VueLuckyWheel
      ref="wheelRef"
      :config="wheelConfig"
      class-name="my-wheel"
      :style="{ border: '2px solid #ccc', borderRadius: '50%' }"
      @start="handleStart"
      @stop="handleStop"
      @center-button-click="handleCenterButtonClick"
      @ready="handleReady"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueLuckyWheel, { VueLuckyWheelRef } from '@ahmiao/lucky-wheel-vue';

const wheelRef = ref<VueLuckyWheelRef>();

const wheelConfig = {
  sectors: [
    { id: 'prize1', text: '一等奖', color: '#FF6B6E' },
    { id: 'prize2', text: '二等奖', color: '#4ECDC4' },
    { id: 'prize3', text: '三等奖', color: '#45B7D1' },
    { id: 'prize4', text: '谢谢参与', color: '#96CEB4' }
  ],
  size: 400
};

const handleStart = () => {
  console.log('🎯 转盘开始旋转');
};

const handleStop = (result: any) => {
  console.log('🎉 抽奖结果:', result);
  alert(`恭喜获得: ${result.text}!`);
};

const handleCenterButtonClick = () => {
  // 可以在这里添加自定义逻辑
  wheelRef.value?.start();
};

const handleReady = (engine: any) => {
  console.log('✅ 转盘初始化完成', engine);
};
</script>
```

## 📋 Props 配置

### VueLuckyWheelProps

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `config` | `WheelConfig` | ✅ | - | 转盘配置对象 |
| `className` | `string` | ❌ | `''` | 画布CSS类名 |
| `style` | `Record<string, any>` | ❌ | `{}` | 画布内联样式对象 |

## 📡 Events 事件

### VueLuckyWheelEmits

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `start` | - | 转盘开始旋转时触发 |
| `stop` | `result: SectorConfig` | 转盘停止时触发，参数为中奖结果 |
| `center-button-click` | - | 中心按钮点击时触发 |
| `ready` | `engine: LuckyWheelEngine` | 组件初始化完成时触发，参数为引擎实例 |

### 事件使用示例

```vue
<template>
  <VueLuckyWheel
    :config="config"
    @start="onStart"
    @stop="onStop"
    @center-button-click="onCenterButtonClick"
    @ready="onReady"
  />
</template>

<script setup lang="ts">
const onStart = () => {
  console.log('转盘开始旋转');
};

const onStop = (result: SectorConfig) => {
  console.log('中奖结果:', result);
  // 处理中奖逻辑
};

const onCenterButtonClick = () => {
  console.log('中心按钮被点击');
  // 自定义点击逻辑
};

const onReady = (engine: LuckyWheelEngine) => {
  console.log('引擎准备完毕:', engine);
  // 可以保存引擎实例做进一步配置
};
</script>
```

## 🔧 Ref 方法

通过模板引用获取组件实例，可调用以下方法：

### 核心方法

```vue
<template>
  <VueLuckyWheel ref="wheelRef" :config="config" />
  <button @click="startLottery">开始抽奖</button>
  <button @click="stopLottery">停止抽奖</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const wheelRef = ref<VueLuckyWheelRef>();

// 开始转动
const startLottery = () => {
  wheelRef.value?.start();
};

// 停止转动（指定奖项ID）
const stopLottery = () => {
  wheelRef.value?.stop('prize1', (result) => {
    console.log('中奖了:', result);
  });
};

// 引擎随机停止（每个扇形等概率，不支持权重）
const randomStop = () => {
  wheelRef.value?.stop();
};

// 获取引擎实例
const getEngine = () => {
  const engine = wheelRef.value?.getEngine();
  console.log('引擎实例:', engine);
};

// 销毁实例
const destroyWheel = () => {
  wheelRef.value?.destroy();
};
</script>
```

#### ⚠️ stop方法说明

**引擎的stop方法只支持两种模式：**

1. **`stop()`** - 引擎内部完全随机停止，每个扇形概率相等  
2. **`stop('prizeId')`** - 指定停止到某个扇形ID

**引擎本身不支持权重功能！** 如果需要权重抽奖，需要在业务层实现权重算法，计算出目标ID后传给stop方法。

### 配置方法

#### 基础配置

```vue
<script setup lang="ts">
const wheelRef = ref<VueLuckyWheelRef>();

// 设置停止偏移范围 (0-1)
const setStopRange = () => {
  wheelRef.value?.setStopOffsetRange(0.8);
};

// 设置目标方向 (0°=12点, 90°=3点, 180°=6点, 270°=9点)
const setDirection = () => {
  wheelRef.value?.setTargetDirection(90);
};

// 设置内边距
const setPadding = () => {
  wheelRef.value?.setInnerPadding(20);
};
</script>
```

#### 箭头配置

```vue
<script setup lang="ts">
// 设置箭头配置
const setArrowConfig = () => {
  wheelRef.value?.setArrowConfig({
    size: 20,
    color: '#333',
    distance: 220,
    image: 'arrow.png'
  });
};

// 设置箭头距离
const setArrowDistance = () => {
  wheelRef.value?.setArrowDistance(250);
};
</script>
```

#### 边框配置

```vue
<script setup lang="ts">
// 设置边框配置
const setBorderConfig = () => {
  wheelRef.value?.setBorderConfig({
    width: 8,
    color: '#333',
    style: 'solid'
  });
};

// 单独设置边框属性
const setBorderProps = () => {
  wheelRef.value?.setBorderWidth(10);
  wheelRef.value?.setBorderColor('#ff0000');
  wheelRef.value?.setBorderStyle('dashed');
};
</script>
```

#### 中心按钮配置

```vue
<script setup lang="ts">
// 设置中心按钮配置
const setCenterButtonConfig = () => {
  wheelRef.value?.setCenterButtonConfig({
    visible: true,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    animation: true
  });
};

// 设置动画
const setAnimation = () => {
  wheelRef.value?.setCenterButtonAnimation(true);
  wheelRef.value?.setCenterButtonAnimationSpeed(0.002);
  wheelRef.value?.setCenterButtonAnimationScale(0.15);
};

// 设置点击回调
const setClickCallback = () => {
  wheelRef.value?.setCenterButtonClickCallback(() => {
    console.log('自定义中心按钮点击事件');
  });
};
</script>
```

#### 扇形描边配置

```vue
<script setup lang="ts">
// 设置全局扇形描边
const setSectorStroke = () => {
  wheelRef.value?.setSectorStrokeConfig({
    width: 3,
    color: '#fff'
  });
  
  wheelRef.value?.setSectorStrokeWidth(2);
  wheelRef.value?.setSectorStrokeColor('#000');
};
</script>
```

### 扇形文本配置

```vue
<script setup lang="ts">
// 设置单个扇形文本配置
const setSectorText = () => {
  wheelRef.value?.setSectorTextConfig('prize1', {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    direction: 'horizontal',
    textAlign: 'center'
  });
};

// 批量设置文本配置
const setBatchSectorText = () => {
  wheelRef.value?.setBatchSectorTextConfig([
    { sectorId: 'prize1', config: { fontSize: 18, color: '#ff0000' } },
    { sectorId: 'prize2', config: { fontSize: 16, color: '#00ff00' } }
  ]);
};

// 设置单个文本属性
const setSectorTextProps = () => {
  wheelRef.value?.setSectorTextFontSize('prize1', 20);
  wheelRef.value?.setSectorTextColor('prize1', '#ff0000');
  wheelRef.value?.setSectorTextDirection('prize1', 'vertical');
  wheelRef.value?.setSectorTextOffset('prize1', 0.2, -0.1);
  wheelRef.value?.setSectorTextAlign('prize1', 'left');
  wheelRef.value?.setSectorTextFont('prize1', 'Arial', 'bold');
  wheelRef.value?.setSectorTextRadius('prize1', 0.7);
  wheelRef.value?.setSectorTextLineHeight('prize1', 18);
  wheelRef.value?.setSectorTextMaxLines('prize1', 3);
};

// 获取和重置文本配置
const handleTextConfig = () => {
  const textConfig = wheelRef.value?.getSectorTextConfigById('prize1');
  console.log('文本配置:', textConfig);
  
  wheelRef.value?.resetSectorTextConfig('prize1');
};
</script>
```

### 扇形图片配置

```vue
<script setup lang="ts">
// 设置背景图片
const setBackgroundImage = () => {
  wheelRef.value?.setBackgroundImage('wheel-bg.png');
};

// 设置扇形背景图片
const setSectorImage = () => {
  wheelRef.value?.setSectorImage('prize1', 'sector-bg.png', {
    width: 100,
    height: 80
  });
};

// 设置扇形内容图片
const setSectorContentImage = () => {
  wheelRef.value?.setSectorContentImage('prize1', 'prize-icon.png', {
    width: 40,
    height: 40,
    offsetX: 0,
    offsetY: 0.3,
    imageRadius: 0.5,
    rotation: 0,
    opacity: 1
  });
};

// 配置内容图片属性
const setContentImageConfig = () => {
  wheelRef.value?.setSectorContentImageConfig('prize1', {
    width: 50,
    height: 50,
    offsetX: 0.2,
    offsetY: -0.1,
    rotation: 45,
    opacity: 0.8
  });
};

// 单独设置内容图片属性
const setContentImageProps = () => {
  wheelRef.value?.setSectorContentImageSize('prize1', 45, 45);
  wheelRef.value?.setSectorContentImageOffset('prize1', 0.1, 0.2);
  wheelRef.value?.setSectorContentImageRadius('prize1', 0.6);
  wheelRef.value?.setSectorContentImageRotation('prize1', 90);
  wheelRef.value?.setSectorContentImageOpacity('prize1', 0.9);
  wheelRef.value?.setSectorContentImageVisible('prize1', false);
};

// 移除内容图片
const removeContentImage = () => {
  wheelRef.value?.removeSectorContentImage('prize1');
};
</script>
```

## 📝 完整示例

```vue
<template>
  <div class="lottery-app">
    <h1>🎰 幸运大转盘抽奖</h1>
    
    <div class="wheel-container">
      <VueLuckyWheel
        ref="wheelRef"
        :config="wheelConfig"
        class-name="lottery-wheel"
        :style="wheelStyle"
        @start="handleStart"
        @stop="handleStop"
        @center-button-click="handleStartLottery"
        @ready="handleReady"
      />
    </div>

    <div class="controls">
      <button 
        @click="handleStartLottery"
        :disabled="isSpinning"
        :class="['btn-primary', { 'btn-disabled': isSpinning }]"
      >
        {{ isSpinning ? '🎯 抽奖中...' : '🎰 开始抽奖' }}
      </button>

      <button 
        @click="handleConfigChange"
        class="btn-secondary"
      >
        🎨 修改样式
      </button>
    </div>

    <div v-if="result" class="result">
      🎉 抽奖结果: {{ result }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import VueLuckyWheel, { VueLuckyWheelRef } from '@ahmiao/lucky-wheel-vue';
import type { WheelConfig, SectorConfig } from '@ahmiao/lucky-wheel-vue';

const wheelRef = ref<VueLuckyWheelRef>();
const isSpinning = ref(false);
const result = ref<string>('');

// 完整的转盘配置
const wheelConfig: WheelConfig = reactive({
  sectors: [
    {
      id: 'prize1',
      text: '特等奖🎁',
      color: '#FF6B6E',
      textConfig: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        direction: 'horizontal',
        textAlign: 'center',
        textRadius: 0.7
      },
      contentImage: {
        url: '/images/prize1.png',
        width: 40,
        height: 40,
        offsetY: 0.3,
        imageRadius: 0.5
      }
    },
    {
      id: 'prize2',
      text: '一等奖🏆',
      color: '#4ECDC4',
      textConfig: {
        fontSize: 14,
        color: '#333'
      }
    },
    {
      id: 'prize3',
      text: '二等奖🏅',
      color: '#45B7D1'
    },
    {
      id: 'prize4',
      text: '三等奖🎖️',
      color: '#96CEB4'
    },
    {
      id: 'prize5',
      text: '谢谢参与',
      color: '#FECA57'
    },
    {
      id: 'prize6',
      text: '再来一次',
      color: '#FF9FF3'
    }
  ],
  size: 400,
  stopOffsetRange: 0.8,
  targetDirection: 0,
  innerPadding: 10,
  canvasPadding: 20,
  backgroundImage: '/images/wheel-bg.png',
  arrow: {
    size: 20,
    color: '#333',
    distance: 220
  },
  centerButton: {
    visible: true,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    border: {
      width: 3,
      color: '#333',
      style: 'solid'
    },
    arrow: {
      size: 15,
      color: '#333'
    },
    animation: {
      enabled: true,
      speed: 0.002,
      scale: 0.1
    }
  },
  border: {
    width: 6,
    color: '#333',
    style: 'solid'
  },
  sectorStroke: {
    width: 2,
    color: '#fff'
  }
});

// 轮盘样式
const wheelStyle = computed(() => ({
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  borderRadius: '50%'
}));

 // 开始抽奖
 const handleStartLottery = () => {
   if (isSpinning.value) return;
   
   isSpinning.value = true;
   result.value = '';
   wheelRef.value?.start();

   // 3-5秒后停止
   const stopTime = 3000 + Math.random() * 2000;
   setTimeout(() => {
     // 方式1: 引擎随机停止（每个扇形等概率）
     // wheelRef.value?.stop();
     
     // 方式2: 指定停止到某个奖项
     // wheelRef.value?.stop('prize1');
     
     // 方式3: 业务逻辑实现权重选择（这不是引擎功能，是业务层逻辑）
     const prizes = ['prize1', 'prize2', 'prize3', 'prize4', 'prize5', 'prize6'];
     const weights = [5, 10, 15, 20, 25, 25]; // 自定义权重
     const targetPrize = getWeightedRandomPrize(prizes, weights);
     wheelRef.value?.stop(targetPrize); // 传入计算好的ID
   }, stopTime);
 };

 // 业务层权重选择实现（引擎本身不支持权重，这是额外的业务逻辑）
 const getWeightedRandomPrize = (prizes: string[], weights: number[]): string => {
   const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
   let randomNum = Math.random() * totalWeight;
   
   for (let i = 0; i < weights.length; i++) {
     randomNum -= weights[i];
     if (randomNum <= 0) {
       return prizes[i];
     }
   }
   return prizes[prizes.length - 1];
 };

// 处理转盘开始
const handleStart = () => {
  console.log('🎯 开始转动');
};

// 处理转盘停止
const handleStop = (sectorResult: SectorConfig) => {
  isSpinning.value = false;
  result.value = sectorResult.text;
  
  // 显示中奖结果
  setTimeout(() => {
    alert(`🎉 恭喜获得: ${sectorResult.text}!`);
  }, 500);
};

// 引擎准备完成
const handleReady = (engine: any) => {
  console.log('✅ 转盘初始化完成', engine);
};

// 动态配置示例
const handleConfigChange = () => {
  // 动态修改配置
  wheelRef.value?.setBorderColor('#ff0000');
  wheelRef.value?.setSectorTextColor('prize1', '#ffff00');
  wheelRef.value?.setCenterButtonAnimationSpeed(0.005);
};
</script>

<style scoped>
.lottery-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.wheel-container {
  position: relative;
  width: 440px;
  height: 440px;
  margin: 20px 0;
}

.controls {
  text-align: center;
  margin-top: 20px;
}

.btn-primary {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #FF6B6E;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: #e55a5d;
}

.btn-disabled {
  background-color: #ccc !important;
  cursor: not-allowed !important;
}

.btn-secondary {
  padding: 12px 24px;
  font-size: 16px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.result {
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #f8f9fa;
  border: 2px solid #28a745;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
}
</style>
```

## 🎯 TypeScript 类型

### 主要接口

```ts
// 组件Props
interface VueLuckyWheelProps {
  config: WheelConfig;
  className?: string;
  style?: Record<string, any>;
}

// 组件Events
interface VueLuckyWheelEmits {
  stop: [result: SectorConfig];
  centerButtonClick: [];
  start: [];
  ready: [engine: LuckyWheelEngine];
}

// 组件Ref方法
interface VueLuckyWheelRef {
  getEngine: () => LuckyWheelEngine | null;
  start: () => void;
  stop: (targetId?: string, onStop?: (result: SectorConfig) => void) => void;
  // ... 更多方法见上文
}
```

### 配置类型

详细的配置类型请参考 [LuckyWheelEngine API文档](./LuckyWheelEngine-API.md) 中的配置接口部分。

## ⚠️ 注意事项

### 1. 响应式配置

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue';

// 使用reactive让配置对象具备响应式
const wheelConfig = reactive({
  sectors: [
    // ... 扇形配置
  ],
  size: 400
});

// 动态修改配置会自动重新初始化转盘
const changeSize = () => {
  wheelConfig.size = 500; // 组件会自动检测配置变化并重新初始化
};
</script>
```

### 2. 组合式API写法

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const wheelRef = ref<VueLuckyWheelRef>();

// 生命周期钩子
onMounted(() => {
  console.log('组件挂载完成');
});

onUnmounted(() => {
  // 组件卸载时自动清理，无需手动调用destroy
  console.log('组件卸载');
});
</script>
```

### 3. 选项式API写法

```vue
<template>
  <VueLuckyWheel
    ref="wheelRef"
    :config="wheelConfig"
    @stop="handleStop"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueLuckyWheel from '@ahmiao/lucky-wheel-vue';

export default defineComponent({
  components: {
    VueLuckyWheel
  },
  
  data() {
    return {
      wheelConfig: {
        sectors: [
          { id: 'prize1', text: '一等奖', color: '#FF6B6E' }
        ]
      }
    };
  },

  methods: {
    handleStop(result: any) {
      console.log('中奖结果:', result);
    },

    startLottery() {
      (this.$refs.wheelRef as any)?.start();
    }
  }
});
</script>
```

### 4. 响应式布局

```vue
<template>
  <!-- 父容器设置具体尺寸 -->
  <div class="wheel-wrapper">
    <VueLuckyWheel
      :config="responsiveConfig"
      :style="{ width: '100%', height: '100%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const responsiveConfig = computed(() => ({
  sectors: [
    // ... 扇形配置
  ],
  // 不设置size让组件自适应父容器
  size: undefined
}));
</script>

<style scoped>
.wheel-wrapper {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1; /* 保持1:1宽高比 */
}
</style>
```

### 5. 错误处理

```vue
<script setup lang="ts">
import { ref } from 'vue';

const error = ref<string>('');

const handleReady = (engine: any) => {
  if (!engine) {
    error.value = '转盘初始化失败';
    return;
  }
  error.value = '';
  console.log('转盘准备就绪');
};
</script>
```

### 6. 深度监听配置变化

```vue
<script setup lang="ts">
import { reactive, watch } from 'vue';

const wheelConfig = reactive({
  sectors: [],
  size: 400
});

// 深度监听配置变化
watch(
  () => wheelConfig,
  (newConfig) => {
    console.log('配置发生变化:', newConfig);
    // 组件会自动重新初始化
  },
  { deep: true }
);
</script>
