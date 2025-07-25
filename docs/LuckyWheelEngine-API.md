# LuckyWheelEngine API 文档

幸运大转盘引擎是一个功能完整的HTML5 Canvas转盘组件，支持丰富的自定义配置、动画效果和交互功能。

## 目录

- [基本用法](#基本用法)
- [构造函数](#构造函数)
- [配置接口](#配置接口)
- [公共方法](#公共方法)
- [配置方法](#配置方法)
- [事件回调](#事件回调)
- [完整示例](#完整示例)

## 基本用法

```typescript
import { LuckyWheelEngine } from './LuckyWheelEngine';

const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
const config = {
  sectors: [
    { id: '1', text: '一等奖', color: '#FF6B6E' },
    { id: '2', text: '二等奖', color: '#4ECDC4' },
    { id: '3', text: '三等奖', color: '#45B7D1' }
  ]
};

const wheel = new LuckyWheelEngine(canvas, config);
```

## 构造函数

### `constructor(canvas: HTMLCanvasElement, config: WheelConfig)`

创建转盘引擎实例。

**参数：**
- `canvas: HTMLCanvasElement` - HTML Canvas元素
- `config: WheelConfig` - 转盘配置对象

**功能：**
- 初始化Canvas渲染上下文
- 设置高DPI显示支持
- 配置默认参数
- 加载所有图片资源
- 启动动画循环
- 设置鼠标事件监听

## 配置接口

### WheelConfig (主配置接口)

```typescript
interface WheelConfig {
  sectors: SectorConfig[];                    // 扇形配置数组（必需）
  size?: number;                             // 轮盘尺寸，可选，如果不提供则默认撑满父元素
  stopOffsetRange?: number;                  // 停止位置偏移范围(0-1)，可选，默认0.6
  targetDirection?: number;                  // 目标停留方向（0度=12点，90度=3点，180度=6点，270度=9点），可选，默认0
  arrow?: ArrowConfig;                       // 箭头配置，可选
  centerButton?: CenterButtonConfig;         // 中心按钮配置，可选
  border?: BorderConfig;                     // 边框配置，可选
  backgroundImage?: string | HTMLImageElement; // 轮盘背景图片，绘制在轮盘圆形区域内，撑满轮盘，不与边框重叠
  innerPadding?: number;                     // 轮盘内边距，不包含边框，设置后扇形区域会缩小，可以看到背景图，默认0
  canvasPadding?: number;                    // 画布内边距，设置整个画布的内边距，影响轮盘在画布中的位置，默认0
  sectorStroke?: {                           // 全局扇形描边配置（会被单个扇形的stroke配置覆盖）
    width?: number;                          // 描边宽度，默认0（无描边）
    color?: string;                          // 描边颜色，默认#fff
  };
}
```

### SectorConfig (扇形配置接口)

```typescript
interface SectorConfig {
  id: string;                                // 扇形唯一标识（必需）
  text: string;                             // 显示文本（必需）
  color: string;                            // 背景颜色（必需）
  image?: SectorImageConfig;                // 扇形背景图片配置
  textConfig?: SectorTextConfig;            // 扇形文本配置
  contentImage?: SectorContentImageConfig;  // 扇形内容图片配置
}
```

### SectorImageConfig (扇形背景图片配置)

```typescript
interface SectorImageConfig {
  url: string;                             // 图片URL（必需）
  width?: number;                          // 图片宽度，如果不设置则自动撑满扇形
  height?: number;                         // 图片高度，如果不设置则自动撑满扇形
}
```

### SectorTextConfig (扇形文本配置)

```typescript
interface SectorTextConfig {
  fontSize?: number;                        // 文本大小，默认14
  color?: string;                          // 文字颜色，默认#fff
  lineHeight?: number;                     // 行高，默认16
  maxLines?: number;                       // 最大行数，默认2
  direction?: 'horizontal' | 'vertical';   // 文本方向，默认horizontal
  offsetX?: number;                        // X轴偏移（相对于扇形中心的百分比，-1到1），默认0
  offsetY?: number;                        // Y轴偏移（相对于扇形中心的百分比，-1到1），默认0
  textAlign?: 'left' | 'center' | 'right'; // 文本对齐，默认center
  fontFamily?: string;                     // 字体家族，默认Arial
  fontWeight?: string;                     // 字体粗细，默认normal
  textRadius?: number;                     // 文本距离中心的距离比例（0-1），默认0.65
}
```

### SectorContentImageConfig (扇形内容图片配置)

```typescript
interface SectorContentImageConfig {
  url: string | HTMLImageElement;          // 图片URL或HTMLImageElement（必需）
  width?: number;                          // 图片宽度，默认30
  height?: number;                         // 图片高度，默认30
  offsetX?: number;                        // X轴偏移（相对于扇形中心的百分比，-1到1），默认0
  offsetY?: number;                        // Y轴偏移（相对于扇形中心的百分比，-1到1），默认0
  imageRadius?: number;                    // 图片距离中心的距离比例（0-1），默认0.5
  rotation?: number;                       // 图片旋转角度（度），默认0，正值顺时针
  opacity?: number;                        // 图片透明度（0-1），默认1
  visible?: boolean;                       // 是否显示，默认true
}
```

### ArrowConfig (箭头配置接口)

```typescript
interface ArrowConfig {
  size?: number;                           // 箭头大小，默认15
  color?: string;                          // 箭头颜色，默认#333
  distance?: number;                       // 箭头距离中心的距离，默认为轮盘半径+20
  image?: string | HTMLImageElement;       // 箭头图片，如果提供则使用图片代替绘制
  imageWidth?: number;                     // 图片宽度，默认30
  imageHeight?: number;                    // 图片高度，默认30
}
```

### CenterButtonConfig (中心按钮配置接口)

```typescript
interface CenterButtonConfig {
  visible?: boolean;                       // 按钮是否显示，默认true
  width?: number;                          // 按钮宽度，默认20
  height?: number;                         // 按钮高度，默认20
  backgroundColor?: string;                // 按钮背景色，默认#fff
  backgroundImage?: string | HTMLImageElement; // 按钮背景图片，可选
  border?: BorderConfig;                   // 按钮边框配置，可选
  arrow?: CenterButtonArrowConfig;         // 按钮内箭头配置，可选
  animation?: boolean | CenterButtonAnimationConfig; // 呼吸灯动画配置，默认true，可以是boolean或详细配置
}
```

### CenterButtonArrowConfig (中心按钮箭头配置)

```typescript
interface CenterButtonArrowConfig {
  size?: number;                           // 箭头大小，默认10
  color?: string;                          // 箭头颜色，默认#333
  offsetY?: number;                        // 箭头垂直偏移，0为按钮中心，负值向上偏移，正值向下偏移，默认0
  image?: string | HTMLImageElement;       // 箭头图片，如果提供则使用图片代替绘制
  imageWidth?: number;                     // 图片宽度，默认20
  imageHeight?: number;                    // 图片高度，默认20
}
```

### CenterButtonAnimationConfig (中心按钮动画配置)

```typescript
interface CenterButtonAnimationConfig {
  enabled?: boolean;                       // 是否开启动画，默认true
  speed?: number;                          // 动画速度，默认0.001，值越大动画越快
  scale?: number;                          // 缩放幅度，默认0.1，表示在0.9-1.1之间缩放
}
```

### BorderConfig (边框配置接口)

```typescript
interface BorderConfig {
  width?: number;                          // 边框宽度，默认2
  color?: string;                          // 边框颜色，默认#333
  style?: "solid" | "dashed" | "dotted";  // 边框样式，默认solid
}
```

## 公共方法

### 核心控制方法

#### `start(): void`
开始转盘转动。

**功能：**
- 启动转盘旋转动画
- 进入加速阶段
- 重置相关状态参数

**使用示例：**
```typescript
wheel.start();
```

#### `stop(targetId?: string, onStop?: (result: SectorConfig) => void): void`
停止转盘并指定目标扇形。

**参数：**
- `targetId?: string` - 目标扇形ID，不提供则随机选择
- `onStop?: (result: SectorConfig) => void` - 停止完成回调

**功能：**
- 进入减速阶段
- 精确停止在目标扇形
- 触发停止回调

**使用示例：**
```typescript
// 随机停止
wheel.stop();

// 指定目标停止
wheel.stop('prize-1', (result) => {
  console.log('获得奖品:', result.text);
});
```

#### `setCenterButtonClickCallback(callback?: () => void): void`
设置中心按钮点击回调函数。

**参数：**
- `callback?: () => void` - 点击回调函数

**使用示例：**
```typescript
wheel.setCenterButtonClickCallback(() => {
  console.log('中心按钮被点击');
  wheel.start();
});
```

#### `destroy(): void`
销毁转盘实例，清理资源。

**功能：**
- 取消所有动画帧
- 重置鼠标样式
- 清理事件监听器

**使用示例：**
```typescript
wheel.destroy();
```

## 配置方法

### 基础配置

#### `setStopOffsetRange(range: number): void`
设置停止位置偏移范围。

**参数：**
- `range: number` - 偏移范围(0-1)

#### `setTargetDirection(direction: number): void`
设置目标停留方向。

**参数：**
- `direction: number` - 方向角度(0-359度)

### 箭头配置

#### `setArrowConfig(arrowConfig: ArrowConfig): void`
设置箭头完整配置。

#### `setArrowDistance(distance: number): void`
设置箭头距离中心的距离。

### 边框配置

#### `setBorderConfig(borderConfig: BorderConfig): void`
设置边框完整配置。

#### `setBorderWidth(width: number): void`
设置边框宽度。

#### `setBorderColor(color: string): void`
设置边框颜色。

#### `setBorderStyle(style: 'solid' | 'dashed' | 'dotted'): void`
设置边框样式。

### 内边距配置

#### `setInnerPadding(padding: number): void`
设置轮盘内边距。

### 扇形描边配置

#### `setSectorStrokeConfig(strokeConfig: { width?: number; color?: string }): void`
设置扇形描边完整配置。

#### `setSectorStrokeWidth(width: number): void`
设置扇形描边宽度。

#### `setSectorStrokeColor(color: string): void`
设置扇形描边颜色。

### 中心按钮配置

#### `setCenterButtonConfig(centerButtonConfig: CenterButtonConfig): void`
设置中心按钮完整配置。

#### `setCenterButtonAnimation(enabled: boolean): void`
开启/关闭中心按钮动画。

#### `setCenterButtonAnimationConfig(animationConfig: CenterButtonAnimationConfig): void`
设置中心按钮动画详细配置。

#### `setCenterButtonAnimationSpeed(speed: number): void`
设置中心按钮动画速度。

#### `setCenterButtonAnimationScale(scale: number): void`
设置中心按钮动画缩放幅度。

### 图片配置

#### `setBackgroundImage(image: string | HTMLImageElement | undefined): void`
设置轮盘背景图片。

#### `setSectorImage(sectorId: string, imageUrl: string | undefined, options?: { width?: number; height?: number }): void`
设置指定扇形的背景图片。

### 扇形文本配置

#### `setSectorTextConfig(sectorId: string, textConfig: SectorTextConfig): void`
设置扇形文本完整配置。

#### `setBatchSectorTextConfig(configs: Array<{ sectorId: string; config: SectorTextConfig }>): void`
批量设置多个扇形的文本配置。

#### `getSectorTextConfigById(sectorId: string): SectorTextConfig | undefined`
获取指定扇形的文本配置。

#### `resetSectorTextConfig(sectorId: string): void`
重置扇形文本配置为默认值。

#### `setSectorTextFontSize(sectorId: string, fontSize: number): void`
设置扇形文本字体大小。

#### `setSectorTextColor(sectorId: string, color: string): void`
设置扇形文本颜色。

#### `setSectorTextLineHeight(sectorId: string, lineHeight: number): void`
设置扇形文本行高。

#### `setSectorTextMaxLines(sectorId: string, maxLines: number): void`
设置扇形文本最大行数。

#### `setSectorTextDirection(sectorId: string, direction: 'horizontal' | 'vertical'): void`
设置扇形文本方向。

#### `setSectorTextOffset(sectorId: string, offsetX: number, offsetY: number): void`
设置扇形文本位置偏移。

#### `setSectorTextAlign(sectorId: string, textAlign: 'left' | 'center' | 'right'): void`
设置扇形文本对齐方式。

#### `setSectorTextFont(sectorId: string, fontFamily: string, fontWeight?: string): void`
设置扇形文本字体。

#### `setSectorTextRadius(sectorId: string, textRadius: number): void`
设置扇形文本半径比例。

### 扇形内容图片配置

#### `setSectorContentImageConfig(sectorId: string, imageConfig: Partial<SectorContentImageConfig>): void`
设置扇形内容图片完整配置。

#### `setSectorContentImage(sectorId: string, imageUrl: string | HTMLImageElement, options?: { width?: number; height?: number; offsetX?: number; offsetY?: number; imageRadius?: number; rotation?: number; opacity?: number; }): void`
设置扇形内容图片。

#### `removeSectorContentImage(sectorId: string): void`
移除扇形内容图片。

#### `setSectorContentImageSize(sectorId: string, width: number, height: number): void`
设置内容图片尺寸。

#### `setSectorContentImageOffset(sectorId: string, offsetX: number, offsetY: number): void`
设置内容图片位置偏移。

#### `setSectorContentImageRadius(sectorId: string, imageRadius: number): void`
设置内容图片半径位置。

#### `setSectorContentImageRotation(sectorId: string, rotation: number): void`
设置内容图片旋转角度。

#### `setSectorContentImageOpacity(sectorId: string, opacity: number): void`
设置内容图片透明度。

#### `setSectorContentImageVisible(sectorId: string, visible: boolean): void`
设置内容图片可见性。

## 事件回调

### 中心按钮点击回调
通过 `setCenterButtonClickCallback()` 设置，当用户点击中心按钮时触发。

### 转盘停止回调
通过 `stop()` 方法的第二个参数设置，当转盘停止转动时触发，返回停止的扇形配置。

## 完整示例

```typescript
import { LuckyWheelEngine } from './LuckyWheelEngine';

// 创建完整的转盘配置
const wheelConfig = {
  // 扇形配置（必需）
  sectors: [
    {
      id: 'prize1',
      text: '一等奖🎁',
      color: '#FF6B6E',
      // 扇形背景图片
      image: {
        url: 'https://example.com/sector-bg1.png',
        width: 120,
        height: 80
      },
      // 文本配置
      textConfig: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',  
        lineHeight: 18,
        maxLines: 2,
        direction: 'horizontal',
        offsetX: 0,
        offsetY: -0.2,
        textAlign: 'center',
        fontFamily: 'Arial',
        textRadius: 0.7
      },
      // 内容图片配置
      contentImage: {
        url: 'https://example.com/prize1.png',
        width: 40,
        height: 40,
        offsetX: 0,
        offsetY: 0.3,
        imageRadius: 0.5,
        rotation: 0,
        opacity: 1,
        visible: true
      }
    },
    {
      id: 'prize2',
      text: '二等奖🏆',
      color: '#4ECDC4',
      textConfig: {
        fontSize: 14,
        color: '#333',
        direction: 'vertical'
      }
    },
    {
      id: 'prize3',
      text: '三等奖🏅',
      color: '#45B7D1'
    },
    {
      id: 'prize4',
      text: '谢谢参与',
      color: '#96CEB4'
    },
    {
      id: 'prize5',
      text: '再来一次',
      color: '#FECA57'
    },
    {
      id: 'prize6',
      text: '小奖励',
      color: '#FF9FF3'
    }
  ],
  
  // 轮盘基础配置
  size: 400,                              // 轮盘尺寸
  stopOffsetRange: 0.8,                   // 停止偏移范围
  targetDirection: 0,                     // 目标方向（12点方向）
  innerPadding: 20,                       // 轮盘内边距
  canvasPadding: 50,                      // 画布内边距
  
  // 背景图片
  backgroundImage: 'https://example.com/wheel-bg.png',
  
  // 箭头配置
  arrow: {
    size: 20,
    color: '#333',
    distance: 220,
    image: 'https://example.com/arrow.png',
    imageWidth: 40,
    imageHeight: 40
  },
  
  // 中心按钮配置
  centerButton: {
    visible: true,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    backgroundImage: 'https://example.com/center-bg.png',
    // 边框配置
    border: {
      width: 4,
      color: '#333',
      style: 'solid'
    },
    // 内部箭头配置
    arrow: {
      size: 20,
      color: '#333',
      offsetY: -5,
      image: 'https://example.com/center-arrow.png',
      imageWidth: 30,
      imageHeight: 30
    },
    // 呼吸灯动画配置
    animation: {
      enabled: true,
      speed: 0.002,
      scale: 0.15
    }
  },
  
  // 轮盘边框配置
  border: {
    width: 8,
    color: '#333',
    style: 'solid'
  },
  
  // 全局扇形描边配置
  sectorStroke: {
    width: 3,
    color: '#fff'
  }
};

// 创建转盘实例
const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
const wheel = new LuckyWheelEngine(canvas, wheelConfig);

// 设置中心按钮点击事件
wheel.setCenterButtonClickCallback(() => {
  console.log('🎯 开始转动');
  wheel.start();
  
  // 3-5秒后随机停止
  const stopTime = 3000 + Math.random() * 2000;
  setTimeout(() => {
    // 随机选择奖项或指定奖项
    const prizes = ['prize1', 'prize2', 'prize3', 'prize4', 'prize5', 'prize6'];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    wheel.stop(randomPrize, (result) => {
      console.log('🎉 抽奖结果:', result);
      alert(`恭喜获得: ${result.text}!`);
    });
  }, stopTime);
});

// 动态配置示例
wheel.setBorderColor('#ff0000');                                    // 设置边框颜色
wheel.setSectorTextColor('prize1', '#ffff00');                     // 设置特定扇形文本颜色
wheel.setCenterButtonAnimationSpeed(0.005);                        // 设置中心按钮动画速度
wheel.setSectorContentImageOpacity('prize1', 0.8);                 // 设置内容图片透明度
wheel.setSectorTextOffset('prize2', 0.2, -0.1);                   // 设置文本偏移

// 批量设置文本配置
wheel.setBatchSectorTextConfig([
  { sectorId: 'prize4', config: { fontSize: 12, color: '#666' } },
  { sectorId: 'prize5', config: { fontSize: 12, color: '#666' } }
]);

// 设置扇形内容图片
wheel.setSectorContentImage('prize2', 'https://example.com/prize2.png', {
  width: 35,
  height: 35,
  offsetY: 0.4,
  rotation: 45
});

// 设置停止偏移范围
wheel.setStopOffsetRange(0.9);

// 设置目标方向
wheel.setTargetDirection(90); // 3点方向

// 使用完毕后销毁实例
// wheel.destroy();
```

## 注意事项

1. **图片加载**: 所有图片资源都是异步加载的，引擎会自动处理加载状态
2. **高DPI支持**: 引擎自动适配高分辨率屏幕，确保清晰显示
3. **内存管理**: 使用完毕后调用 `destroy()` 方法清理资源
4. **性能优化**: 引擎使用 `requestAnimationFrame` 确保流畅动画
5. **响应式**: 支持父元素尺寸自适应 
