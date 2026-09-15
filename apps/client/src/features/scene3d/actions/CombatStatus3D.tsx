import { useMemo } from 'react';
import { useChatStore } from '@/features/chat/store/chatStore';
import { useActionTargetingStore } from '@/features/actions/store/actionTargetingStore';
import { useLobbyStore } from '@/features/lobby/store/lobbyStore';
import { getTokenCenter, resolveActionTargeting } from '@shared/rules/targetingRules';
import type { Token } from '@shared/types/token';
import { canRenderCombatEffect } from './combatVisuals';

export default function CombatStatus3D({ tokens, cellSize }: { tokens: Record<string, Token>; cellSize: number }) {
  const { activeAction: action, casterTokenId, mouseWorldPosition } = useActionTargetingStore();
  const effects = useLobbyStore((s) => s.activeEffects), messages = useChatStore((s) => s.messages);
  const range = useMemo(() => {
    const caster = tokens[casterTokenId ?? '']; if (!action || !caster) return null;
    const origin = getTokenCenter(caster, cellSize);
    return resolveActionTargeting({ action, tokens, casterTokenId: caster.id, origin, requestedPoint: mouseWorldPosition ?? origin, tokenSize: cellSize, pixelsPerFoot: cellSize / 5 });
  }, [action, tokens, casterTokenId, mouseWorldPosition, cellSize]);
  return <>
    {action && range && <small role="status">{action.name} · {!range.isWithinRange || range.rangeBand === 'invalid' ? 'Fora do alcance' : range.rangeBand === 'long' ? 'Alcance longo' : 'Alcance normal'} · {range.affectedTokenIds.length} afetado(s)</small>}
    <details style={{ flexBasis: '100%' }}><summary>Combate — resultados do chat</summary>
      {messages.slice(-3).map((message) => <p key={message.id} style={{ margin: '5px 0' }}>{message.dice?.outcome === 'critical' && <strong>Crítico · </strong>}{message.text}</p>)}
      {effects.filter((effect) => canRenderCombatEffect(effect, tokens)).map((effect) => <p key={effect.id}>{effect.name} · {effect.remainingTurns} turno(s)</p>)}
      <small>Mesmas ações, recursos e resultados do modo 2D. Volumes e distância espacial são visuais.</small>
    </details>
  </>;
}
