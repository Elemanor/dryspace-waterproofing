import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, XCircle, CheckCircle, ArrowLeft, ArrowRight, Printer, RotateCcw, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: 'When was your home built?',
    options: [
      { label: 'Built after 2000', points: 0 },
      { label: '1980-2000', points: 2 },
      { label: '1960-1979', points: 5 },
      { label: '1940-1959', points: 7 },
      { label: 'Before 1940', points: 10 },
    ],
  },
  {
    id: 2,
    text: 'What type of foundation do you have?',
    options: [
      { label: 'Poured concrete', points: 0 },
      { label: 'Concrete block', points: 4 },
      { label: 'Stone/rubble', points: 8 },
      { label: "Don't know", points: 5 },
    ],
  },
  {
    id: 3,
    text: 'Have you ever had water in your basement?',
    options: [
      { label: 'Never', points: 0 },
      { label: 'Once, minor', points: 3 },
      { label: 'A few times', points: 6 },
      { label: 'Regularly during rain', points: 9 },
      { label: 'Currently have water', points: 10 },
    ],
  },
  {
    id: 4,
    text: 'Do you have a sump pump?',
    options: [
      { label: 'Yes, tested within 6 months', points: 0 },
      { label: "Yes, haven't tested recently", points: 4 },
      { label: "Yes, but it's old / not sure if it works", points: 7 },
      { label: 'No sump pump', points: 8 },
    ],
  },
  {
    id: 5,
    text: 'Do you have a backwater valve?',
    options: [
      { label: 'Yes, inspected recently', points: 0 },
      { label: 'Yes, never inspected', points: 3 },
      { label: 'No', points: 6 },
      { label: "Don't know", points: 5 },
    ],
  },
  {
    id: 6,
    text: 'What is the condition of your gutters and downspouts?',
    options: [
      { label: 'Clean gutters, downspouts extend 6+ feet', points: 0 },
      { label: 'Gutters okay, short downspouts', points: 3 },
      { label: 'Gutters need cleaning', points: 5 },
      { label: 'No gutters or damaged gutters', points: 8 },
    ],
  },
  {
    id: 7,
    text: 'How is the grading around your foundation?',
    options: [
      { label: 'Slopes away from house on all sides', points: 0 },
      { label: 'Mostly slopes away, some flat spots', points: 3 },
      { label: 'Flat or slopes toward house in places', points: 6 },
      { label: 'Slopes toward house / pooling near foundation', points: 9 },
      { label: "Don't know", points: 4 },
    ],
  },
  {
    id: 8,
    text: 'Do you see any cracks in your foundation?',
    options: [
      { label: 'No visible cracks', points: 0 },
      { label: 'Small hairline cracks', points: 2 },
      { label: 'Cracks wider than a pencil', points: 6 },
      { label: 'Multiple cracks or horizontal cracks', points: 9 },
    ],
  },
  {
    id: 9,
    text: 'Is there a musty smell in your basement?',
    options: [
      { label: 'No smell', points: 0 },
      { label: 'Slight musty smell sometimes', points: 3 },
      { label: 'Noticeable musty smell', points: 6 },
      { label: 'Strong mold/mildew odor', points: 9 },
    ],
  },
  {
    id: 10,
    text: 'Do you see white powder on basement walls (efflorescence)?',
    options: [
      { label: 'None', points: 0 },
      { label: 'Small patches', points: 3 },
      { label: 'Widespread', points: 7 },
    ],
  },
  {
    id: 11,
    text: 'What is your basement humidity level?',
    options: [
      { label: 'Below 50%', points: 0 },
      { label: '50-60%', points: 3 },
      { label: 'Above 60%', points: 7 },
      { label: "Don't know / no humidity meter", points: 4 },
    ],
  },
  {
    id: 12,
    text: 'Are there trees within 15 feet of your foundation?',
    options: [
      { label: 'No large trees nearby', points: 0 },
      { label: 'Small trees nearby', points: 2 },
      { label: 'Large trees within 15 feet', points: 5 },
      { label: 'Large trees within 5 feet', points: 8 },
    ],
  },
  {
    id: 13,
    text: 'What is your basement finish status?',
    options: [
      { label: 'Unfinished (can see walls/floor)', points: 0 },
      { label: 'Partially finished', points: 2 },
      { label: 'Fully finished (walls covered)', points: 5 },
    ],
  },
  {
    id: 14,
    text: 'What is your soil type (if known)?',
    options: [
      { label: 'Sandy/gravel (good drainage)', points: 0 },
      { label: 'Mixed/loam', points: 3 },
      { label: 'Clay (poor drainage)', points: 7 },
      { label: "Don't know", points: 4 },
    ],
  },
  {
    id: 15,
    text: 'Has any waterproofing work been done?',
    options: [
      { label: 'Professional waterproofing within 10 years', points: 0 },
      { label: 'Professional waterproofing over 10 years ago', points: 3 },
      { label: 'DIY waterproofing (paint/sealant)', points: 5 },
      { label: 'Never waterproofed', points: 7 },
    ],
  },
];

interface Answer {
  questionId: number;
  optionIndex: number;
  points: number;
}

interface ScoreTier {
  min: number;
  max: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  actionText: string;
}

const scoreTiers: ScoreTier[] = [
  {
    min: 80,
    max: 100,
    label: 'Excellent',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    icon: ShieldCheck,
    summary: 'Your basement is in great shape! Continue with regular maintenance to keep it that way.',
    actionText: 'Continue regular maintenance',
  },
  {
    min: 60,
    max: 79,
    label: 'Good — Minor Concerns',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    icon: CheckCircle,
    summary: 'Your basement is generally healthy, but a few areas need attention.',
    actionText: 'Address minor concerns within the next 6 months',
  },
  {
    min: 40,
    max: 59,
    label: 'Fair — Action Recommended',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    icon: AlertTriangle,
    summary: 'Several risk factors are present. Take action to prevent future problems.',
    actionText: 'Schedule a professional assessment within the next 3 months',
  },
  {
    min: 20,
    max: 39,
    label: 'At Risk — Professional Assessment Needed',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    icon: AlertCircle,
    summary: 'Multiple significant risk factors detected. Professional inspection strongly recommended.',
    actionText: 'We strongly recommend a professional inspection',
  },
  {
    min: 0,
    max: 19,
    label: 'Critical — Immediate Attention',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    icon: XCircle,
    summary: 'Your basement has serious risk factors that require immediate professional attention.',
    actionText: 'Contact a professional this week',
  },
];

const recommendations: Record<number, { concern: string; tip: string; cost?: string }> = {
  1: {
    concern: 'Older home foundation',
    tip: 'Older foundations are more prone to settling and cracking. Schedule regular inspections every 2-3 years.',
    cost: '$300-500 per inspection',
  },
  2: {
    concern: 'Foundation type concerns',
    tip: 'Stone/rubble or block foundations may require specialized waterproofing. Consider a professional assessment of structural integrity.',
    cost: '$500-1,000 for assessment',
  },
  3: {
    concern: 'Water infiltration history',
    tip: 'Previous water issues often recur. Install comprehensive drainage solutions including interior/exterior waterproofing.',
    cost: '$3,000-8,000 depending on severity',
  },
  4: {
    concern: 'Sump pump issues',
    tip: 'Test your sump pump quarterly. Consider a battery backup system and alarm. Replace pumps every 7-10 years.',
    cost: '$800-1,500 for new pump + backup',
  },
  5: {
    concern: 'No backwater valve',
    tip: 'A backwater valve prevents sewage backup during heavy rain. Installation may qualify for city rebates.',
    cost: '$1,500-3,000 (often subsidized)',
  },
  6: {
    concern: 'Gutter/downspout problems',
    tip: 'Clean gutters twice yearly. Extend downspouts 6+ feet from foundation. Add splash pads to prevent erosion.',
    cost: '$200-800 for extensions + cleaning',
  },
  7: {
    concern: 'Poor grading',
    tip: 'Regrade soil to slope away from foundation (6" drop over 10 feet). This is one of the most cost-effective preventions.',
    cost: '$1,000-3,000 for regrading',
  },
  8: {
    concern: 'Foundation cracks',
    tip: 'Wide or horizontal cracks may indicate structural issues. Get professional evaluation. Crack injection may be needed.',
    cost: '$500-3,000 depending on severity',
  },
  9: {
    concern: 'Musty odor/mold risk',
    tip: 'Musty smells indicate moisture. Install dehumidifier, improve ventilation, and identify moisture source.',
    cost: '$300-800 for dehumidifier + air quality test',
  },
  10: {
    concern: 'Efflorescence (white powder)',
    tip: 'White powder indicates water seeping through walls. Requires exterior waterproofing or interior drainage system.',
    cost: '$3,000-10,000 for waterproofing',
  },
  11: {
    concern: 'High humidity',
    tip: 'Keep humidity below 50%. Install a dehumidifier (50-70 pint capacity). Improve basement ventilation.',
    cost: '$300-600 for quality dehumidifier',
  },
  12: {
    concern: 'Trees near foundation',
    tip: 'Tree roots can crack foundations and absorb moisture unevenly. Consider root barriers or strategic tree removal.',
    cost: '$500-2,000 for root management',
  },
  13: {
    concern: 'Finished basement hiding problems',
    tip: 'Finished walls can hide moisture, cracks, and mold. Inspect behind walls if you notice any signs of water.',
    cost: '$500-1,500 for inspection behind walls',
  },
  14: {
    concern: 'Clay soil drainage issues',
    tip: 'Clay soil holds water. Consider French drain installation, improved grading, or exterior waterproofing membrane.',
    cost: '$2,000-8,000 for drainage solutions',
  },
  15: {
    concern: 'No waterproofing done',
    tip: 'Proactive waterproofing saves thousands in future damage. Get quotes for interior drainage + exterior membrane.',
    cost: '$5,000-15,000 for comprehensive system',
  },
};

export default function BasementHealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    const points = question.options[optionIndex].points;

    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (a) => a.questionId === question.id
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = {
        questionId: question.id,
        optionIndex,
        points,
      };
    } else {
      newAnswers.push({
        questionId: question.id,
        optionIndex,
        points,
      });
    }

    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    const rawPoints = answers.reduce((sum, answer) => sum + answer.points, 0);
    const normalizedScore = Math.round((rawPoints / 120) * 100);
    const healthScore = 100 - normalizedScore;
    return healthScore;
  };

  const getScoreTier = (score: number): ScoreTier => {
    return (
      scoreTiers.find((tier) => score >= tier.min && score <= tier.max) ||
      scoreTiers[scoreTiers.length - 1]
    );
  };

  const getTopRisks = () => {
    return answers
      .filter((a) => a.points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)
      .map((a) => ({
        ...a,
        question: questions.find((q) => q.id === a.questionId)!,
        recommendation: recommendations[a.questionId],
      }));
  };

  const getStrengths = () => {
    return answers
      .filter((a) => a.points === 0)
      .slice(0, 3)
      .map((a) => questions.find((q) => q.id === a.questionId)!);
  };

  const estimateCost = () => {
    const topRisks = getTopRisks();
    if (topRisks.length === 0) return '$0-500';
    if (topRisks.length <= 2 && topRisks[0].points <= 3)
      return '$500-2,000';
    if (topRisks.some((r) => r.points >= 7)) return '$5,000-15,000';
    if (topRisks.length >= 3) return '$2,000-8,000';
    return '$1,000-4,000';
  };

  const currentAnswer = answers.find(
    (a) => a.questionId === questions[currentQuestion]?.id
  );

  if (showResults) {
    const score = calculateScore();
    const tier = getScoreTier(score);
    const topRisks = getTopRisks();
    const strengths = getStrengths();
    const TierIcon = tier.icon;

    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              Your Basement Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Score Gauge */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-48 h-48 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${
                    tier.borderColor.replace('border-', 'var(--') + ')'
                  } ${score}%, #e5e7eb ${score}%)`,
                }}
              >
                <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold" style={{ color: tier.color.replace('text-', '') }}>
                    {score}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    out of 100
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <TierIcon className={cn('w-8 h-8', tier.color)} />
                <Badge
                  className={cn(
                    'text-lg px-4 py-1',
                    tier.bgColor,
                    tier.color,
                    tier.borderColor,
                    'border-2'
                  )}
                >
                  {tier.label}
                </Badge>
              </div>

              <p className="mt-4 text-center text-gray-700 max-w-xl">
                {tier.summary}
              </p>
              <p className="mt-2 text-center font-semibold text-gray-900">
                {tier.actionText}
              </p>
            </div>

            {/* Top Risks */}
            {topRisks.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  Your Top Risks
                </h3>
                <div className="space-y-4">
                  {topRisks.map((risk, idx) => (
                    <Card
                      key={risk.questionId}
                      className={cn(
                        'border-l-4',
                        risk.points >= 7
                          ? 'border-l-red-500'
                          : risk.points >= 4
                          ? 'border-l-orange-500'
                          : 'border-l-yellow-500'
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-gray-700">
                                #{idx + 1}
                              </span>
                              <h4 className="font-semibold text-gray-900">
                                {risk.recommendation.concern}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {risk.recommendation.tip}
                            </p>
                            {risk.recommendation.cost && (
                              <p className="text-sm font-medium text-gray-700">
                                Estimated cost: {risk.recommendation.cost}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              className={cn(
                                'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold',
                                risk.points >= 7
                                  ? 'bg-red-500'
                                  : risk.points >= 4
                                  ? 'bg-orange-500'
                                  : 'bg-yellow-500'
                              )}
                            >
                              {risk.points}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {strengths.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Your Strengths
                </h3>
                <div className="grid gap-3">
                  {strengths.map((strength) => (
                    <div
                      key={strength.id}
                      className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{strength.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Estimate */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Estimated Cost for Recommended Improvements
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {estimateCost()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Based on your assessment results. Actual costs vary by location
                and scope of work.
              </p>
            </div>

            {/* Personalized Report */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Personalized Report
              </h3>
              <div className="space-y-3">
                {answers.map((answer) => {
                  const question = questions.find(
                    (q) => q.id === answer.questionId
                  )!;
                  const selectedOption =
                    question.options[answer.optionIndex];
                  const rec = recommendations[answer.questionId];

                  return (
                    <Card
                      key={answer.questionId}
                      className={cn(
                        'border-l-4',
                        answer.points === 0
                          ? 'border-l-green-400'
                          : answer.points <= 3
                          ? 'border-l-blue-400'
                          : answer.points <= 6
                          ? 'border-l-yellow-400'
                          : 'border-l-red-400'
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {question.text}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              Your answer: <span className="font-medium">{selectedOption.label}</span>
                            </p>
                            {answer.points > 0 && (
                              <p className="text-sm text-gray-600 italic">
                                {rec.tip}
                              </p>
                            )}
                          </div>
                          <div
                            className={cn(
                              'w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0',
                              answer.points === 0
                                ? 'bg-green-500'
                                : answer.points <= 3
                                ? 'bg-blue-500'
                                : answer.points <= 6
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            )}
                          >
                            {answer.points}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a href="/free-inspection">Book Free Inspection</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                asChild
              >
                <a href="tel:437-545-0067">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 437-545-0067
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Report
              </Button>
              <Button
                variant="outline"
                onClick={handleRetake}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 text-left transition-all duration-200',
                  'hover:border-blue-400 hover:bg-blue-50 hover:shadow-md',
                  currentAnswer?.optionIndex === idx
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      currentAnswer?.optionIndex === idx
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    )}
                  >
                    {currentAnswer?.optionIndex === idx && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <div className="mt-8 flex justify-start">
              <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Question
              </Button>
            </div>
          )}

          {currentAnswer !== undefined && currentQuestion === questions.length - 1 && (
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                onClick={() => setShowResults(true)}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                View Your Results
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
