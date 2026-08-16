import riceIcon from './assets/rice.svg'
import breadIcon from './assets/bread.svg'
import saladIcon from './assets/salad.svg'
import coffeeIcon from './assets/coffee.svg'
import eggIcon from './assets/egg.svg'
import bananaIcon from './assets/banana.svg'
import yogurtIcon from './assets/yogurt.svg'
import beerIcon from './assets/beer.svg'

export const mealTypes = [
  { id: 'breakfast', label: '朝ごはん', icon: riceIcon },
  { id: 'lunch', label: '昼ごはん', icon: saladIcon },
  { id: 'dinner', label: '夕ごはん', icon: coffeeIcon },
  { id: 'snack', label: '間食', icon: beerIcon },
]

export const foodOptions = [
  { id: 'rice', label: 'ごはん', icon: riceIcon, kcal: 250 },
  { id: 'bread', label: 'パン', icon: breadIcon, kcal: 180 },
  { id: 'salad', label: 'サラダ', icon: saladIcon, kcal: 90 },
  { id: 'coffee', label: 'コーヒー', icon: coffeeIcon, kcal: 20 },
  { id: 'egg', label: '卵', icon: eggIcon, kcal: 100 },
  { id: 'banana', label: 'バナナ', icon: bananaIcon, kcal: 100 },
  { id: 'yogurt', label: 'ヨーグルト', icon: yogurtIcon, kcal: 120 },
  { id: 'beer', label: 'ビール', icon: beerIcon, kcal: 150 },
]

export const aiAnswers = {
  weight: {
    question: '体重が減らないのはなぜ？',
    answer: '短期的な変化だけでなく、食事・睡眠・活動量を1週間の傾向で確認してみましょう。',
  },
  breakfast: {
    question: 'おすすめの朝ごはんは？',
    answer: '卵やヨーグルトに、ごはんや果物を組み合わせると、たんぱく質とエネルギーを補いやすくなります。',
  },
  motivation: {
    question: 'モチベーションが続かない…',
    answer: '完璧を目指さず、まずは1日1回の記録から。小さく続けられる行動を選びましょう。',
  },
}
