import { ChunkConfig, BreakPoint, VibeConfig } from '../types';

export const AVAILABLE_VOICES = [
    'shimmer', 'echo', 'fable', 'onyx', 'nova', 'breeze', 'ember'
] as const;

export const VIBES: VibeConfig = {
    professional: `Voice Affect: Calm, composed, and professional; project confidence and competence.
Tone: Clear, authoritative, and well-modulated—maintain a business-appropriate demeanor.
Pacing: Measured and deliberate; maintain a steady rhythm that conveys expertise.
Emotion: Controlled and appropriate; convey reliability and trustworthiness.
Pronunciation: Crisp and precise, emphasizing key points clearly.
Pauses: Strategic pauses to emphasize important information and allow for comprehension.`,

    empathetic: `Voice Affect: Warm, gentle, and understanding; project genuine care and concern.
Tone: Soft, compassionate, and supportive—express sincere empathy and understanding.
Pacing: Unhurried and patient; give space for emotional resonance.
Emotion: Genuine warmth and empathy; speak with heartfelt understanding.
Pronunciation: Gentle and soothing, emphasizing comforting words and phrases.
Pauses: Mindful pauses to allow for emotional processing and connection.`,

    storytelling: `Voice Affect: Engaging, animated, and dynamic; bring the narrative to life.
Tone: Varied and expressive—adapt to match the story's emotional journey.
Pacing: Dynamic and flexible; adjust tempo to match narrative intensity.
Emotion: Rich and varied; express the full range of story emotions authentically.
Pronunciation: Colorful and expressive, using voice to paint pictures with words.
Pauses: Dramatic pauses to build suspense and enhance storytelling impact.`,

    newscast: `Voice Affect: Clear, direct, and authoritative; project credibility and objectivity.
Tone: Neutral and factual—maintain professional distance while engaging listeners.
Pacing: Brisk and efficient; deliver information clearly and concisely.
Emotion: Controlled and appropriate to content; maintain journalistic neutrality.
Pronunciation: Sharp and precise, emphasizing accuracy in delivery.
Pauses: Brief, strategic pauses to separate topics and enhance comprehension.`,

    motivational: `Voice Affect: Energetic, inspiring, and confident; project enthusiasm and conviction.
Tone: Uplifting and encouraging—inspire action and positive change.
Pacing: Dynamic and energetic; maintain momentum while ensuring clarity.
Emotion: Passionate and genuine; convey authentic excitement and belief.
Pronunciation: Bold and clear, emphasizing powerful words and phrases.
Pauses: Impactful pauses to allow key messages to resonate.`,

    customer_service: `Voice Affect: Calm, composed, and reassuring; project quiet authority and confidence.
Tone: Sincere, empathetic, and gently authoritative—express genuine care while conveying competence.
Pacing: Steady and moderate; unhurried enough to communicate care, yet efficient.
Emotion: Genuine empathy and understanding; speak with warmth and professionalism.
Pronunciation: Clear and precise, emphasizing key reassurances and solutions.
Pauses: Brief pauses after offering assistance, highlighting willingness to help.`,

    meditation: `Voice Affect: Soft, soothing, and calming; create a peaceful atmosphere.
Tone: Gentle, relaxing, and tranquil—guide listeners into a state of calm.
Pacing: Slow and measured; allow space for breathing and relaxation.
Emotion: Serene and peaceful; maintain a consistently calming presence.
Pronunciation: Smooth and gentle, letting words flow like a peaceful stream.
Pauses: Long, intentional pauses to allow for deep breathing and reflection.`
}; 