import type * as CSS from 'csstype'
import { Animated, ColorValue, ImageResizeMode } from 'react-native'

type WebUnits = '%' | 'px' | 'em' | 'rem' | 'vh' | 'vw'
type WebMaths = 'calc' | 'max' | 'min'
export type WebDimensionValue =
  | 'auto'
  | `${number}${WebUnits}`
  | `${WebMaths}(${string})`
  | Animated.AnimatedNode
  | null

type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'

type AnimatableNumericValue = number | Animated.AnimatedNode
type AnimatableStringValue = string | Animated.AnimatedNode

/**
 * Flex Prop Types
 * @see https://reactnative.dev/docs/flexbox
 * @see https://reactnative.dev/docs/layout-props
 */
interface FlexStyle {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined
  alignItems?: FlexAlignType | undefined
  alignSelf?: 'auto' | FlexAlignType | undefined
  aspectRatio?: number | string | undefined
  borderBottomWidth?: number | undefined
  borderEndWidth?: number | undefined
  borderLeftWidth?: number | undefined
  borderRightWidth?: number | undefined
  borderStartWidth?: number | undefined
  borderTopWidth?: number | undefined
  borderWidth?: number | undefined
  bottom?: WebDimensionValue | undefined
  display?: 'none' | 'flex' | undefined
  end?: WebDimensionValue | undefined
  flex?: number | undefined
  flexBasis?: WebDimensionValue | undefined
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined
  rowGap?: number | undefined
  gap?: number | undefined
  columnGap?: number | undefined
  flexGrow?: number | undefined
  flexShrink?: number | undefined
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined
  height?: WebDimensionValue | undefined
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
  left?: WebDimensionValue | undefined
  margin?: WebDimensionValue | undefined
  marginBottom?: WebDimensionValue | undefined
  marginEnd?: WebDimensionValue | undefined
  marginHorizontal?: WebDimensionValue | undefined
  marginLeft?: WebDimensionValue | undefined
  marginRight?: WebDimensionValue | undefined
  marginStart?: WebDimensionValue | undefined
  marginTop?: WebDimensionValue | undefined
  marginVertical?: WebDimensionValue | undefined
  maxHeight?: WebDimensionValue | undefined
  maxWidth?: WebDimensionValue | undefined
  minHeight?: WebDimensionValue | undefined
  minWidth?: WebDimensionValue | undefined
  overflow?: 'visible' | 'hidden' | 'scroll' | undefined
  padding?: WebDimensionValue | undefined
  paddingBottom?: WebDimensionValue | undefined
  paddingEnd?: WebDimensionValue | undefined
  paddingHorizontal?: WebDimensionValue | undefined
  paddingLeft?: WebDimensionValue | undefined
  paddingRight?: WebDimensionValue | undefined
  paddingStart?: WebDimensionValue | undefined
  paddingTop?: WebDimensionValue | undefined
  paddingVertical?: WebDimensionValue | undefined
  position?: 'absolute' | 'relative' | undefined
  right?: WebDimensionValue | undefined
  start?: WebDimensionValue | undefined
  top?: WebDimensionValue | undefined
  width?: WebDimensionValue | undefined
  zIndex?: number | undefined

  /**
   * @platform ios
   */
  direction?: 'inherit' | 'ltr' | 'rtl' | undefined
}

interface ShadowStyleIOS {
  shadowColor?: ColorValue | undefined
  shadowOffset?: Readonly<{ width: number; height: number }> | undefined
  shadowOpacity?: AnimatableNumericValue | undefined
  shadowRadius?: number | undefined
}

interface PerpectiveTransform {
  perspective: AnimatableNumericValue
}

interface RotateTransform {
  rotate: AnimatableStringValue
}

interface RotateXTransform {
  rotateX: AnimatableStringValue
}

interface RotateYTransform {
  rotateY: AnimatableStringValue
}

interface RotateZTransform {
  rotateZ: AnimatableStringValue
}

interface ScaleTransform {
  scale: AnimatableNumericValue
}

interface ScaleXTransform {
  scaleX: AnimatableNumericValue
}

interface ScaleYTransform {
  scaleY: AnimatableNumericValue
}

interface TranslateXTransform {
  translateX: AnimatableNumericValue
}

interface TranslateYTransform {
  translateY: AnimatableNumericValue
}

interface SkewXTransform {
  skewX: AnimatableStringValue
}

interface SkewYTransform {
  skewY: AnimatableStringValue
}

interface MatrixTransform {
  matrix: AnimatableNumericValue[]
}

interface TransformsStyle {
  transform?:
    | (
        | PerpectiveTransform
        | RotateTransform
        | RotateXTransform
        | RotateYTransform
        | RotateZTransform
        | ScaleTransform
        | ScaleXTransform
        | ScaleYTransform
        | TranslateXTransform
        | TranslateYTransform
        | SkewXTransform
        | SkewYTransform
        | MatrixTransform
      )[]
    | string
    | undefined
  /**
   * @deprecated Use matrix in transform prop instead.
   */
  transformMatrix?: Array<number> | undefined
  /**
   * @deprecated Use rotate in transform prop instead.
   */
  rotation?: AnimatableNumericValue | undefined
  /**
   * @deprecated Use scaleX in transform prop instead.
   */
  scaleX?: AnimatableNumericValue | undefined
  /**
   * @deprecated Use scaleY in transform prop instead.
   */
  scaleY?: AnimatableNumericValue | undefined
  /**
   * @deprecated Use translateX in transform prop instead.
   */
  translateX?: AnimatableNumericValue | undefined
  /**
   * @deprecated Use translateY in transform prop instead.
   */
  translateY?: AnimatableNumericValue | undefined
}

/**
 * @see https://reactnative.dev/docs/view#style
 */
interface BaseViewStyle extends FlexStyle, ShadowStyleIOS, TransformsStyle {
  backfaceVisibility?: 'visible' | 'hidden' | undefined
  backgroundColor?: ColorValue | undefined
  borderBlockColor?: ColorValue | undefined
  borderBlockEndColor?: ColorValue | undefined
  borderBlockStartColor?: ColorValue | undefined
  borderBottomColor?: ColorValue | undefined
  borderBottomEndRadius?: AnimatableNumericValue | undefined
  borderBottomLeftRadius?: AnimatableNumericValue | undefined
  borderBottomRightRadius?: AnimatableNumericValue | undefined
  borderBottomStartRadius?: AnimatableNumericValue | undefined
  borderColor?: ColorValue | undefined
  /**
   * On iOS 13+, it is possible to change the corner curve of borders.
   * @platform ios
   */
  borderCurve?: 'circular' | 'continuous' | undefined
  borderEndColor?: ColorValue | undefined
  borderEndEndRadius?: AnimatableNumericValue | undefined
  borderEndStartRadius?: AnimatableNumericValue | undefined
  borderLeftColor?: ColorValue | undefined
  borderRadius?: AnimatableNumericValue | undefined
  borderRightColor?: ColorValue | undefined
  borderStartColor?: ColorValue | undefined
  borderStartEndRadius?: AnimatableNumericValue | undefined
  borderStartStartRadius?: AnimatableNumericValue | undefined
  borderStyle?: 'solid' | 'dotted' | 'dashed' | undefined
  borderTopColor?: ColorValue | undefined
  borderTopEndRadius?: AnimatableNumericValue | undefined
  borderTopLeftRadius?: AnimatableNumericValue | undefined
  borderTopRightRadius?: AnimatableNumericValue | undefined
  borderTopStartRadius?: AnimatableNumericValue | undefined
  opacity?: AnimatableNumericValue | undefined
  /**
   * Sets the elevation of a view, using Android's underlying
   * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
   * This adds a drop shadow to the item and affects z-order for overlapping views.
   * Only supported on Android 5.0+, has no effect on earlier versions.
   *
   * @platform android
   */
  elevation?: number | undefined
  /**
   * Controls whether the View can be the target of touch events.
   */
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined
}

interface WebViewStyle {
  /** @platform web */
  $$css?: boolean

  /** @platform web */
  backdropFilter?: CSS.Properties['backdropFilter']
  /** @platform web */
  animationDelay?: CSS.Properties['animationDelay']
  /** @platform web */
  animationDirection?: CSS.Properties['animationDirection']
  /** @platform web */
  animationDuration?: CSS.Properties['animationDuration']
  /** @platform web */
  animationFillMode?: CSS.Properties['animationFillMode']
  /** @platform web */
  animationName?: CSS.Properties['animationName']
  /** @platform web */
  animationIterationCount?: CSS.Properties['animationIterationCount']
  /** @platform web */
  animationPlayState?: CSS.Properties['animationPlayState']
  /** @platform web */
  animationTimingFunction?: CSS.Properties['animationTimingFunction']
  /** @platform web */
  backgroundAttachment?: CSS.Properties['backgroundAttachment']
  /** @platform web */
  backgroundBlendMode?: CSS.Properties['backgroundBlendMode']
  /** @platform web */
  backgroundClip?: CSS.Properties['backgroundClip']
  /** @platform web */
  backgroundImage?: CSS.Properties['backgroundImage']
  /** @platform web */
  backgroundOrigin?: CSS.Properties['backgroundOrigin']
  /** @platform web */
  backgroundPosition?: CSS.Properties['backgroundPosition']
  /** @platform web */
  backgroundRepeat?: CSS.Properties['backgroundRepeat']
  /** @platform web */
  backgroundSize?: CSS.Properties['backgroundSize']
  /** @platform web */
  boxShadow?: CSS.Properties['boxShadow']
  /** @platform web */
  boxSizing?: CSS.Properties['boxSizing']
  /** @platform web */
  clip?: CSS.Properties['clip']
  /** @platform web */
  cursor?: CSS.Properties['cursor']
  /** @platform web */
  filter?: CSS.Properties['filter']
  /** @platform web */
  gridAutoColumns?: CSS.Properties['gridAutoColumns']
  /** @platform web */
  gridAutoFlow?: CSS.Properties['gridAutoFlow']
  /** @platform web */
  gridAutoRows?: CSS.Properties['gridAutoRows']
  /** @platform web */
  gridColumnEnd?: CSS.Properties['gridColumnEnd']
  /** @platform web */
  gridColumnGap?: CSS.Properties['gridColumnGap']
  /** @platform web */
  gridColumnStart?: CSS.Properties['gridColumnStart']
  /** @platform web */
  gridRowEnd?: CSS.Properties['gridRowEnd']
  /** @platform web */
  gridRowGap?: CSS.Properties['gridRowGap']
  /** @platform web */
  gridRowStart?: CSS.Properties['gridRowStart']
  /** @platform web */
  gridTemplateColumns?: CSS.Properties['gridTemplateColumns']
  /** @platform web */
  gridTemplateRows?: CSS.Properties['gridTemplateRows']
  /** @platform web */
  gridTemplateAreas?: CSS.Properties['gridTemplateAreas']
  /** @platform web */
  outline?: CSS.Properties['outline']
  /** @platform web */
  outlineColor?: CSS.Properties['outlineColor']
  /** @platform web */
  overflowX?: CSS.Properties['overflowX']
  /** @platform web */
  overflowY?: CSS.Properties['overflowY']
  /** @platform web */
  overscrollBehavior?: CSS.Properties['overscrollBehavior']
  /** @platform web */
  overscrollBehaviorX?: CSS.Properties['overscrollBehaviorX']
  /** @platform web */
  overscrollBehaviorY?: CSS.Properties['overscrollBehaviorY']
  /** @platform web */
  perspective?: CSS.Properties['perspective']
  /** @platform web */
  perspectiveOrigin?: CSS.Properties['perspectiveOrigin']
  /** @platform web */
  touchAction?: CSS.Properties['touchAction']
  /** @platform web */
  transformOrigin?: CSS.Properties['transformOrigin']
  /** @platform web */
  transitionDelay?: CSS.Properties['transitionDelay']
  /** @platform web */
  transitionDuration?: CSS.Properties['transitionDuration']
  /** @platform web */
  transitionProperty?: CSS.Properties['transitionProperty']
  /** @platform web */
  transitionTimingFunction?: CSS.Properties['transitionTimingFunction']
  /** @platform web */
  userSelect?: CSS.Properties['userSelect']
  /** @platform web */
  visibility?: CSS.Properties['visibility']
  /** @platform web */
  willChange?: CSS.Properties['willChange']
  /** @platform web */
  position?: CSS.Properties['position']
}

export type ViewStyle = Omit<BaseViewStyle, 'position'> & WebViewStyle

type FontVariant =
  | 'small-caps'
  | 'oldstyle-nums'
  | 'lining-nums'
  | 'tabular-nums'
  | 'proportional-nums'
interface TextStyleIOS extends ViewStyle {
  fontVariant?: FontVariant[] | undefined
  textDecorationColor?: ColorValue | undefined
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | undefined
  writingDirection?: 'auto' | 'ltr' | 'rtl' | undefined
}

interface TextStyleAndroid extends ViewStyle {
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined
  verticalAlign?: 'auto' | 'top' | 'bottom' | 'middle' | undefined
  includeFontPadding?: boolean | undefined
}

// @see https://reactnative.dev/docs/text#style
interface BaseTextStyle extends TextStyleIOS, TextStyleAndroid, ViewStyle {
  color?: ColorValue | undefined
  fontFamily?: string | undefined
  fontSize?: number | undefined
  fontStyle?: 'normal' | 'italic' | undefined
  /**
   * Specifies font weight. The values 'normal' and 'bold' are supported
   * for most fonts. Not all fonts have a variant for each of the numeric
   * values, in that case the closest one is chosen.
   */
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  letterSpacing?: number | undefined
  lineHeight?: number | undefined
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | undefined
  textDecorationColor?: ColorValue | undefined
  textShadowColor?: ColorValue | undefined
  textShadowOffset?: { width: number; height: number } | undefined
  textShadowRadius?: number | undefined
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined
  testID?: string | undefined
}

interface WebTextStyle {
  /** @platform web */
  $$css?: boolean

  /** @platform web */
  fontSize?: CSS.Properties['fontSize']
  /** @platform web */
  lineHeight?: CSS.Properties['lineHeight']
  /** @platform web */
  fontFeatureSettings?: CSS.Properties['fontFeatureSettings']
  /** @platform web */
  textIndent?: CSS.Properties['textIndent']
  /** @platform web */
  textOverflow?: CSS.Properties['textOverflow']
  /** @platform web */
  textRendering?: CSS.Properties['textRendering']
  /** @platform web */
  textTransform?: CSS.Properties['textTransform']
  /** @platform web */
  unicodeBidi?: CSS.Properties['unicodeBidi']
  /** @platform web */
  wordWrap?: CSS.Properties['wordWrap']
}

export type TextStyle = Omit<
  BaseTextStyle,
  'position' | 'fontSize' | 'lineHeight'
> &
  WebTextStyle &
  WebViewStyle

/**
 * Image style
 * @see https://reactnative.dev/docs/image#style
 */
interface BaseImageStyle extends FlexStyle, ShadowStyleIOS, TransformsStyle {
  resizeMode?: ImageResizeMode | undefined
  backfaceVisibility?: 'visible' | 'hidden' | undefined
  borderBottomLeftRadius?: AnimatableNumericValue | undefined
  borderBottomRightRadius?: AnimatableNumericValue | undefined
  backgroundColor?: ColorValue | undefined
  borderColor?: ColorValue | undefined
  borderRadius?: AnimatableNumericValue | undefined
  borderTopLeftRadius?: AnimatableNumericValue | undefined
  borderTopRightRadius?: AnimatableNumericValue | undefined
  overflow?: 'visible' | 'hidden' | undefined
  overlayColor?: ColorValue | undefined
  tintColor?: ColorValue | undefined
  opacity?: AnimatableNumericValue | undefined
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | undefined
}

interface WebImageStyle {
  /** @platform web */
  $$css?: boolean

  /** @platform web */
  opacity?: CSS.Properties['opacity']
}

export type ImageStyle = Omit<BaseImageStyle, 'position'> &
  WebImageStyle &
  WebViewStyle
