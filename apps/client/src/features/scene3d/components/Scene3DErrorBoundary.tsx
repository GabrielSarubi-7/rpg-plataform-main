import { Component, type ReactNode } from "react";
import Scene3DLoadingOverlay from "./Scene3DLoadingOverlay";

export default class Scene3DErrorBoundary extends Component<{ children: ReactNode; onReturnTo2D: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error("Renderer 3D indisponível:", error); }
  render() {
    return this.state.failed
      ? <Scene3DLoadingOverlay message="Não foi possível abrir o 3D. Verifique o suporte WebGL e as imagens do mapa." onReturnTo2D={this.props.onReturnTo2D} />
      : this.props.children;
  }
}
