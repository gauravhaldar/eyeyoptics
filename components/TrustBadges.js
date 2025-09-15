export default function TrustBadges() {
  const badges = [
    { text: 'Free Shipping', icon: '🚚' },
    { text: 'Easy Returns', icon: '↩️' },
    { text: 'Secure Payment', icon: '🔒' },
  ];

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {badges.map((badge) => (
          <div key={badge.text} className="flex flex-col items-center">
            <span className="text-4xl">{badge.icon}</span>
            <p className="mt-2 text-lg font-medium">{badge.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
