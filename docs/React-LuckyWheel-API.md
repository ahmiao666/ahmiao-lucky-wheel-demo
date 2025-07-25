# React LuckyWheel 组件使用文档

React版幸运大转盘组件，基于Canvas实现的高性能、可自定义的抽奖转盘组件。

## 📦 安装

```bash
npm install @ahmiao/lucky-wheel-react
# 或
yarn add @ahmiao/lucky-wheel-react
# 或
pnpm add @ahmiao/lucky-wheel-react
```

## 🚀 快速开始

### 基础用法

```tsx
import React, { useRef } from 'react';
import ReactLuckyWheel, { ReactLuckyWheelRef } from '@ahmiao/lucky-wheel-react';

const App: React.FC = () => {
  const wheelRef = useRef<ReactLuckyWheelRef>(null);

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

  const handleStop = (result) => {
    console.log('🎉 抽奖结果:', result);
    alert(`恭喜获得: ${result.text}!`);
  };

  const handleCenterButtonClick = () => {
    // 可以在这里添加自定义逻辑
    wheelRef.current?.start();
  };

  return (
    <div style={{ width: '500px', height: '500px', margin: '0 auto' }}>
      <ReactLuckyWheel
        ref={wheelRef}
        config={wheelConfig}
        onStart={handleStart}
        onStop={handleStop}
        onCenterButtonClick={handleCenterButtonClick}
        className="my-wheel"
        style={{ border: '2px solid #ccc', borderRadius: '50%' }}
      />
    </div>
  );
};

export default App;
```

## 📋 Props 配置

### ReactLuckyWheelProps

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `config` | `WheelConfig` | ✅ | - | 转盘配置对象 |
| `className` | `string` | ❌ | - | 画布CSS类名 |
| `style` | `React.CSSProperties` | ❌ | - | 画布内联样式 |
| `onStop` | `(result: SectorConfig) => void` | ❌ | - | 转盘停止回调 |
| `onCenterButtonClick` | `() => void` | ❌ | - | 中心按钮点击回调 |
| `onStart` | `() => void` | ❌ | - | 转盘开始旋转回调 |
| `onReady` | `(engine: LuckyWheelEngine) => void` | ❌ | - | 组件准备完成回调 |

### 回调事件说明

- **onStart**: 转盘开始旋转时触发
- **onStop**: 转盘停止时触发，参数为中奖结果
- **onCenterButtonClick**: 中心按钮点击时触发（如果没有提供，默认点击开始转动）
- **onReady**: 组件初始化完成时触发，参数为引擎实例

## 🔧 Ref 方法

通过 `useRef` 获取组件实例，可调用以下方法：

### 核心方法

```tsx
const wheelRef = useRef<ReactLuckyWheelRef>(null);

// 开始转动
wheelRef.current?.start();

// 停止转动（指定奖项ID）
wheelRef.current?.stop('prize1', (result) => {
  console.log('中奖了:', result);
});

// 引擎随机停止（每个扇形等概率，不支持权重）
wheelRef.current?.stop();

// 获取引擎实例
const engine = wheelRef.current?.getEngine();

// 销毁实例
wheelRef.current?.destroy();
```

#### ⚠️ stop方法说明

**引擎的stop方法只支持两种模式：**

1. **`stop()`** - 引擎内部完全随机停止，每个扇形概率相等
2. **`stop('prizeId')`** - 指定停止到某个扇形ID

**引擎本身不支持权重功能！** 如果需要权重抽奖，需要在业务层实现权重算法，计算出目标ID后传给stop方法。

### 配置方法

#### 基础配置

```tsx
// 设置停止偏移范围 (0-1)
wheelRef.current?.setStopOffsetRange(0.8);

// 设置目标方向 (0°=12点, 90°=3点, 180°=6点, 270°=9点)
wheelRef.current?.setTargetDirection(90);

// 设置内边距
wheelRef.current?.setInnerPadding(20);
```

#### 箭头配置

```tsx
// 设置箭头配置
wheelRef.current?.setArrowConfig({
  size: 20,
  color: '#333',
  distance: 220,
  image: 'arrow.png'
});

// 设置箭头距离
wheelRef.current?.setArrowDistance(250);
```

#### 边框配置

```tsx
// 设置边框配置
wheelRef.current?.setBorderConfig({
  width: 8,
  color: '#333',
  style: 'solid'
});

// 单独设置边框属性
wheelRef.current?.setBorderWidth(10);
wheelRef.current?.setBorderColor('#ff0000');
wheelRef.current?.setBorderStyle('dashed');
```

#### 中心按钮配置

```tsx
// 设置中心按钮配置
wheelRef.current?.setCenterButtonConfig({
  visible: true,
  width: 80,
  height: 80,
  backgroundColor: '#fff',
  animation: true
});

// 设置动画
wheelRef.current?.setCenterButtonAnimation(true);
wheelRef.current?.setCenterButtonAnimationSpeed(0.002);
wheelRef.current?.setCenterButtonAnimationScale(0.15);

// 设置点击回调
wheelRef.current?.setCenterButtonClickCallback(() => {
  console.log('自定义中心按钮点击事件');
});
```

#### 扇形描边配置

```tsx
// 设置全局扇形描边
wheelRef.current?.setSectorStrokeConfig({
  width: 3,
  color: '#fff'
});

wheelRef.current?.setSectorStrokeWidth(2);
wheelRef.current?.setSectorStrokeColor('#000');
```

### 扇形文本配置

```tsx
// 设置单个扇形文本配置
wheelRef.current?.setSectorTextConfig('prize1', {
  fontSize: 16,
  color: '#fff',
  fontWeight: 'bold',
  direction: 'horizontal',
  textAlign: 'center'
});

// 批量设置文本配置
wheelRef.current?.setBatchSectorTextConfig([
  { sectorId: 'prize1', config: { fontSize: 18, color: '#ff0000' } },
  { sectorId: 'prize2', config: { fontSize: 16, color: '#00ff00' } }
]);

// 设置单个文本属性
wheelRef.current?.setSectorTextFontSize('prize1', 20);
wheelRef.current?.setSectorTextColor('prize1', '#ff0000');
wheelRef.current?.setSectorTextDirection('prize1', 'vertical');
wheelRef.current?.setSectorTextOffset('prize1', 0.2, -0.1);
wheelRef.current?.setSectorTextAlign('prize1', 'left');
wheelRef.current?.setSectorTextFont('prize1', 'Arial', 'bold');
wheelRef.current?.setSectorTextRadius('prize1', 0.7);
wheelRef.current?.setSectorTextLineHeight('prize1', 18);
wheelRef.current?.setSectorTextMaxLines('prize1', 3);

// 获取和重置文本配置
const textConfig = wheelRef.current?.getSectorTextConfigById('prize1');
wheelRef.current?.resetSectorTextConfig('prize1');
```

### 扇形图片配置

```tsx
// 设置背景图片
wheelRef.current?.setBackgroundImage('wheel-bg.png');

// 设置扇形背景图片
wheelRef.current?.setSectorImage('prize1', 'sector-bg.png', {
  width: 100,
  height: 80
});

// 设置扇形内容图片
wheelRef.current?.setSectorContentImage('prize1', 'prize-icon.png', {
  width: 40,
  height: 40,
  offsetX: 0,
  offsetY: 0.3,
  imageRadius: 0.5,
  rotation: 0,
  opacity: 1
});

// 配置内容图片属性
wheelRef.current?.setSectorContentImageConfig('prize1', {
  width: 50,
  height: 50,
  offsetX: 0.2,
  offsetY: -0.1,
  rotation: 45,
  opacity: 0.8
});

// 单独设置内容图片属性
wheelRef.current?.setSectorContentImageSize('prize1', 45, 45);
wheelRef.current?.setSectorContentImageOffset('prize1', 0.1, 0.2);
wheelRef.current?.setSectorContentImageRadius('prize1', 0.6);
wheelRef.current?.setSectorContentImageRotation('prize1', 90);
wheelRef.current?.setSectorContentImageOpacity('prize1', 0.9);
wheelRef.current?.setSectorContentImageVisible('prize1', false);

// 移除内容图片
wheelRef.current?.removeSectorContentImage('prize1');
```

## 📝 完整示例

```tsx
import React, { useRef, useState } from 'react';
import ReactLuckyWheel, { ReactLuckyWheelRef, WheelConfig } from '@ahmiao/lucky-wheel-react';

const LotteryApp: React.FC = () => {
  const wheelRef = useRef<ReactLuckyWheelRef>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('');

  // 完整的转盘配置
  const wheelConfig: WheelConfig = {
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
  };

  // 开始抽奖
  const handleStartLottery = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult('');
    wheelRef.current?.start();

    // 3-5秒后停止
    const stopTime = 3000 + Math.random() * 2000;
    setTimeout(() => {
      // 方式1: 引擎随机停止（每个扇形等概率）
      // wheelRef.current?.stop();
      
      // 方式2: 指定停止到某个奖项
      // wheelRef.current?.stop('prize1');
      
      // 方式3: 业务逻辑实现权重选择（这不是引擎功能，是业务层逻辑）
      const prizes = ['prize1', 'prize2', 'prize3', 'prize4', 'prize5', 'prize6'];
      const weights = [5, 10, 15, 20, 25, 25]; // 自定义权重
      const targetPrize = getWeightedRandomPrize(prizes, weights);
      wheelRef.current?.stop(targetPrize); // 传入计算好的ID
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

  // 处理转盘停止
  const handleStop = (sectorResult: any) => {
    setIsSpinning(false);
    setResult(sectorResult.text);
    
    // 显示中奖结果
    setTimeout(() => {
      alert(`🎉 恭喜获得: ${sectorResult.text}!`);
    }, 500);
  };

  // 动态配置示例
  const handleConfigChange = () => {
    // 动态修改配置
    wheelRef.current?.setBorderColor('#ff0000');
    wheelRef.current?.setSectorTextColor('prize1', '#ffff00');
    wheelRef.current?.setCenterButtonAnimationSpeed(0.005);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎰 幸运大转盘抽奖</h1>
      
      <div style={{ 
        position: 'relative',
        width: '440px', 
        height: '440px', 
        margin: '20px 0' 
      }}>
        <ReactLuckyWheel
          ref={wheelRef}
          config={wheelConfig}
          onStart={() => console.log('🎯 开始转动')}
          onStop={handleStop}
          onCenterButtonClick={handleStartLottery}
          onReady={(engine) => console.log('✅ 转盘初始化完成', engine)}
          className="lottery-wheel"
          style={{ 
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            borderRadius: '50%'
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleStartLottery}
          disabled={isSpinning}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: isSpinning ? '#ccc' : '#FF6B6E',
            border: 'none',
            borderRadius: '25px',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {isSpinning ? '🎯 抽奖中...' : '🎰 开始抽奖'}
        </button>

        <button 
          onClick={handleConfigChange}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            color: '#333',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '25px',
            cursor: 'pointer'
          }}
        >
          🎨 修改样式
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px 30px',
          backgroundColor: '#f8f9fa',
          border: '2px solid #28a745',
          borderRadius: '10px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#28a745'
        }}>
          🎉 抽奖结果: {result}
        </div>
      )}
    </div>
  );
};

export default LotteryApp;
```

## 🎯 TypeScript 类型

### 主要接口

```tsx
// 组件Props
interface ReactLuckyWheelProps {
  config: WheelConfig;
  className?: string;
  style?: React.CSSProperties;
  onStop?: (result: SectorConfig) => void;
  onCenterButtonClick?: () => void;
  onStart?: () => void;
  onReady?: (engine: LuckyWheelEngine) => void;
}

// 组件Ref方法
interface ReactLuckyWheelRef {
  getEngine: () => LuckyWheelEngine | null;
  start: () => void;
  stop: (targetId?: string, onStop?: (result: SectorConfig) => void) => void;
  // ... 更多方法见上文
}
```

### 配置类型

详细的配置类型请参考 [LuckyWheelEngine API文档](./LuckyWheelEngine-API.md) 中的配置接口部分。

## ⚠️ 注意事项

### 1. 性能优化

```tsx
// 使用React.memo优化重渲染
const OptimizedWheel = React.memo(ReactLuckyWheel);

// 使用useCallback缓存回调函数
const handleStop = useCallback((result) => {
  console.log('结果:', result);
}, []);
```

### 2. 响应式布局

```tsx
// 父容器设置具体尺寸
<div style={{ width: '100%', maxWidth: '500px', aspectRatio: '1' }}>
  <ReactLuckyWheel
    config={{
      ...wheelConfig,
      size: undefined // 不设置size让组件自适应父容器
    }}
    style={{ width: '100%', height: '100%' }}
  />
</div>
```

### 3. 组件卸载清理

```tsx
useEffect(() => {
  return () => {
    // 组件卸载时自动清理，无需手动调用
    // wheelRef.current?.destroy(); // 不需要手动调用
  };
}, []);
```

### 4. 配置更新

```tsx
// config变化时组件会自动重新初始化
const [config, setConfig] = useState(initialConfig);

// 动态更新配置
const updateConfig = () => {
  setConfig(prev => ({
    ...prev,
    size: 500
  }));
};
```

### 5. 错误处理

```tsx
const handleReady = (engine: LuckyWheelEngine) => {
  if (!engine) {
    console.error('转盘初始化失败');
    return;
  }
  console.log('转盘准备就绪');
};
