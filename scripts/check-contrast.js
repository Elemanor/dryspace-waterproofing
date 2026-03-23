/**
 * Color Contrast Checker for Spaders Website
 * Checks WCAG AA/AAA compliance for color combinations
 */

// Color values from unified-design-system.css
const colors = {
  // Text colors
  white: '#ffffff',
  gray900: '#111827',
  gray800: '#1f2937',
  gray600: '#4b5563',
  gray400: '#9ca3af',
  
  // Background colors
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  secondary: '#dc2626',
  accent: '#f59e0b',
  success: '#10b981',
  
  // Common backgrounds
  bgWhite: '#ffffff',
  bgGray50: '#f9fafb',
  bgGray900: '#111827',
};

// Calculate relative luminance
function getLuminance(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check WCAG compliance
function checkWCAG(ratio) {
  return {
    ratio: ratio.toFixed(2),
    AALarge: ratio >= 3,     // Large text (18pt+)
    AA: ratio >= 4.5,         // Normal text
    AAALarge: ratio >= 4.5,   // Large text enhanced
    AAA: ratio >= 7,          // Normal text enhanced
  };
}

// Test common color combinations
console.log('🎨 Spaders Waterproofing - Color Contrast Report\n');
console.log('=' .repeat(60));

const tests = [
  // Primary text combinations
  { name: 'White on Primary Blue', text: colors.white, bg: colors.primary },
  { name: 'White on Primary Dark', text: colors.white, bg: colors.primaryDark },
  { name: 'Gray 900 on White', text: colors.gray900, bg: colors.bgWhite },
  { name: 'Gray 600 on White', text: colors.gray600, bg: colors.bgWhite },
  
  // Button combinations
  { name: 'White on Secondary (Red)', text: colors.white, bg: colors.secondary },
  { name: 'White on Accent (Orange)', text: colors.white, bg: colors.accent },
  { name: 'White on Success (Green)', text: colors.white, bg: colors.success },
  
  // Dark mode
  { name: 'White on Gray 900', text: colors.white, bg: colors.bgGray900 },
  { name: 'Gray 400 on Gray 900', text: colors.gray400, bg: colors.bgGray900 },
];

tests.forEach(test => {
  const ratio = getContrastRatio(test.text, test.bg);
  const wcag = checkWCAG(ratio);
  
  console.log(`\n📍 ${test.name}`);
  console.log(`   Text: ${test.text} | Background: ${test.bg}`);
  console.log(`   Contrast Ratio: ${wcag.ratio}:1`);
  
  const status = wcag.AAA ? '✅ AAA' : wcag.AA ? '✅ AA' : '⚠️  FAIL';
  console.log(`   WCAG Status: ${status}`);
  
  if (!wcag.AA) {
    console.log(`   ⚠️  WARNING: Does not meet WCAG AA standards!`);
  }
});

console.log('\n' + '=' .repeat(60));
console.log('\n📊 Summary:');
console.log('   ✅ AA  = Meets WCAG AA standards (minimum)');
console.log('   ✅ AAA = Meets WCAG AAA standards (enhanced)');
console.log('   ⚠️  FAIL = Does not meet minimum standards\n');

// Recommendations
console.log('💡 Recommendations:');
console.log('   - All text should meet AA standards (4.5:1 ratio)');
console.log('   - Large text (18pt+) needs 3:1 ratio minimum');
console.log('   - Critical elements should aim for AAA (7:1 ratio)');
console.log('   - Consider users with visual impairments\n');