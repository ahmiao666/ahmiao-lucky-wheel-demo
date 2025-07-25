export interface SectorImageConfig {
    url: string;
    width?: number;
    height?: number;
}
export interface SectorTextConfig {
    fontSize?: number;
    color?: string;
    lineHeight?: number;
    maxLines?: number;
    direction?: 'horizontal' | 'vertical';
    offsetX?: number;
    offsetY?: number;
    textAlign?: 'left' | 'center' | 'right';
    fontFamily?: string;
    fontWeight?: string;
    textRadius?: number;
}
export interface SectorContentImageConfig {
    url: string | HTMLImageElement;
    width?: number;
    height?: number;
    offsetX?: number;
    offsetY?: number;
    imageRadius?: number;
    rotation?: number;
    opacity?: number;
    visible?: boolean;
}
export interface SectorConfig {
    id: string;
    text: string;
    color: string;
    image?: SectorImageConfig;
    textConfig?: SectorTextConfig;
    contentImage?: SectorContentImageConfig;
}
export interface ArrowConfig {
    size?: number;
    color?: string;
    distance?: number;
    image?: string | HTMLImageElement;
    imageWidth?: number;
    imageHeight?: number;
}
export interface CenterButtonArrowConfig {
    size?: number;
    color?: string;
    offsetY?: number;
    image?: string | HTMLImageElement;
    imageWidth?: number;
    imageHeight?: number;
}
export interface CenterButtonAnimationConfig {
    enabled?: boolean;
    speed?: number;
    scale?: number;
}
export interface CenterButtonConfig {
    visible?: boolean;
    width?: number;
    height?: number;
    backgroundColor?: string;
    backgroundImage?: string | HTMLImageElement;
    border?: BorderConfig;
    arrow?: CenterButtonArrowConfig;
    animation?: boolean | CenterButtonAnimationConfig;
}
export interface BorderConfig {
    width?: number;
    color?: string;
    style?: "solid" | "dashed" | "dotted";
}
export interface WheelConfig {
    sectors: SectorConfig[];
    size?: number;
    stopOffsetRange?: number;
    targetDirection?: number;
    arrow?: ArrowConfig;
    centerButton?: CenterButtonConfig;
    border?: BorderConfig;
    backgroundImage?: string | HTMLImageElement;
    innerPadding?: number;
    canvasPadding?: number;
    sectorStroke?: {
        width?: number;
        color?: string;
    };
}
