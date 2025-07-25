/**幸运大转盘引擎 */
import { WheelConfig, SectorConfig, ArrowConfig, BorderConfig, CenterButtonConfig, CenterButtonAnimationConfig, SectorTextConfig, SectorContentImageConfig } from "./types";
export declare class LuckyWheelEngine {
    private static readonly DEFAULTS;
    private canvas;
    private ctx;
    private config;
    private rotateDeg;
    private speed;
    private accelerationTime;
    private decelerationTime;
    private stopOffsetRange;
    private targetDirection;
    private startTime;
    private endTime;
    private stopDeg;
    private endDeg;
    private prizeDeg;
    private FPS;
    private animationId?;
    private continuousAnimationId?;
    private onStopCallback?;
    private images;
    private imageLoadStates;
    private step;
    private prizeFlag;
    private devicePixelRatio;
    private onCenterButtonClickCallback?;
    private centerButtonAnimationTime;
    constructor(canvas: HTMLCanvasElement, config: WheelConfig);
    /**
     * 获取默认尺寸，撑满父元素
     */
    private getDefaultSize;
    /**
     * 设置高DPI Canvas，解决模糊问题
     */
    private setupHighDPICanvas;
    /**
     * 设置中心按钮鼠标事件
     */
    private setupCenterButtonMouseEvents;
    /**
     * 检查鼠标位置是否在中心按钮内
     */
    private isPointInCenterButton;
    private imageLoaders;
    private loadAllImages;
    private loadSingleImage;
    private loadImage;
    private loadMapImages;
    private loadSectorImages;
    private loadSectorContentImages;
    private reloadImageByName;
    private loadArrowImage;
    private loadCenterButtonBackgroundImage;
    private loadCenterButtonArrowImage;
    /**
     * 获取动画配置
     */
    private getAnimationConfig;
    /**
     * 启动持续动画循环（用于中心按钮呼吸灯效果）
     */
    private startContinuousAnimation;
    /**
     * 停止持续动画循环
     */
    private stopContinuousAnimation;
    start(): void;
    stop(targetId?: string, onStop?: (result: SectorConfig) => void): void;
    /**
     * 设置中心按钮点击回调函数
     */
    setCenterButtonClickCallback(callback?: () => void): void;
    private updateConfig;
    private createConfigSetter;
    setStopOffsetRange: (range: number) => void;
    setTargetDirection: (direction: number) => void;
    setArrowConfig: (updates: Partial<ArrowConfig>) => void;
    setArrowDistance: (distance: number) => void;
    setBorderConfig: (updates: Partial<BorderConfig>) => void;
    setBorderWidth: (width: number) => void;
    setBorderColor: (color: string) => void;
    setBorderStyle: (style: "solid" | "dashed" | "dotted") => void;
    setInnerPadding: (padding: number) => void;
    setSectorStrokeConfig: (updates: Partial<{
        width?: number | undefined;
        color?: string | undefined;
    }>) => void;
    setSectorStrokeWidth: (width: number) => void;
    setSectorStrokeColor: (color: string) => void;
    setCenterButtonConfig: (updates: Partial<CenterButtonConfig>) => void;
    setCenterButtonAnimation: (enabled: boolean) => void;
    setCenterButtonAnimationConfig: (animationConfig: CenterButtonAnimationConfig) => void;
    setCenterButtonAnimationSpeed: (speed: number) => void;
    setCenterButtonAnimationScale: (scale: number) => void;
    private findSector;
    private createSectorConfigSetter;
    setSectorTextConfig: (sectorId: string, updates: Partial<SectorTextConfig>) => void;
    setBatchSectorTextConfig: (configs: Array<{
        sectorId: string;
        config: SectorTextConfig;
    }>) => void;
    getSectorTextConfigById: (sectorId: string) => SectorTextConfig | undefined;
    resetSectorTextConfig: (sectorId: string) => void;
    setSectorTextFontSize: (sectorId: string, fontSize: number) => void;
    setSectorTextColor: (sectorId: string, color: string) => void;
    setSectorTextLineHeight: (sectorId: string, lineHeight: number) => void;
    setSectorTextMaxLines: (sectorId: string, maxLines: number) => void;
    setSectorTextDirection: (sectorId: string, direction: "horizontal" | "vertical") => void;
    setSectorTextOffset: (sectorId: string, offsetX: number, offsetY: number) => void;
    setSectorTextAlign: (sectorId: string, textAlign: "left" | "center" | "right") => void;
    setSectorTextFont: (sectorId: string, fontFamily: string, fontWeight?: string) => void;
    setSectorTextRadius: (sectorId: string, textRadius: number) => void;
    setSectorContentImageConfig: (sectorId: string, imageConfig: Partial<SectorContentImageConfig>) => void;
    setSectorContentImage: (sectorId: string, imageUrl: string | HTMLImageElement, options?: {
        width?: number;
        height?: number;
        offsetX?: number;
        offsetY?: number;
        imageRadius?: number;
        rotation?: number;
        opacity?: number;
    }) => void;
    removeSectorContentImage: (sectorId: string) => void;
    setSectorContentImageSize: (sectorId: string, width: number, height: number) => void;
    setSectorContentImageOffset: (sectorId: string, offsetX: number, offsetY: number) => void;
    setSectorContentImageRadius: (sectorId: string, imageRadius: number) => void;
    setSectorContentImageRotation: (sectorId: string, rotation: number) => void;
    setSectorContentImageOpacity: (sectorId: string, opacity: number) => void;
    setSectorContentImageVisible: (sectorId: string, visible: boolean) => void;
    private run;
    private carveOnGunwaleOfAMovingBoat;
    /**
     * 二次缓动 - 加速
     */
    private quadEaseIn;
    /**
     * 二次缓动 - 减速
     */
    private quadEaseOut;
    private draw;
    private drawBackgroundImage;
    private drawSector;
    /**
     * 获取扇形文本的默认配置
     */
    private getDefaultTextConfig;
    /**
     * 获取扇形的完整文本配置（合并默认配置和自定义配置）
     */
    private getSectorTextConfig;
    /**
     * 绘制扇形文字（支持横向/纵向、换行、溢出隐藏、自定义位置）
     */
    private drawSectorText;
    /**
     * 计算文本区域尺寸
     */
    private calculateTextArea;
    /**
   * 创建文本裁剪路径
   */
    private createTextClipPath;
    /**
   * 智能文本换行（支持中英文混合）
   */
    private wrapTextWithConfig;
    /**
   * 渲染文本行
   */
    private renderTextLines;
    /**
     * 统一绘制扇形分割线，使用全局描边配置
     */
    private drawSectorDividers;
    private drawSectorImage;
    private drawSectorContentImage;
    /**
     * 获取内容图片的默认配置
     */
    private getDefaultContentImageConfig;
    private drawArrow;
    private drawCenterButton;
    private drawCenterButtonArrow;
    private drawWheelBorder;
    private getRandomSectorId;
    setBackgroundImage: (image: string | HTMLImageElement | undefined) => void;
    setSectorImage(sectorId: string, imageUrl: string | undefined, options?: {
        width?: number;
        height?: number;
    }): void;
    destroy(): void;
}
