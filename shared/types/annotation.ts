export type AnnotationTool = "none" | "pen" | "text";

export type AnnotationVisibility = "public" | "gm";

export interface AnnotationPoint {
  x: number;
  y: number;
}

export interface BaseAnnotation {
  id: string;
  visibility: AnnotationVisibility;
  createdBy?: string;
}

export interface PenAnnotation extends BaseAnnotation {
  type: "pen";
  points: AnnotationPoint[];
  color: string;
  size: number;
}

export interface TextAnnotation extends BaseAnnotation {
  type: "text";
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
}

export type MapAnnotation = PenAnnotation | TextAnnotation;