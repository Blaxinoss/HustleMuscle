const Quote = () => (
    <div className="mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-2">
            Manage your <span className="text-green-500">Fitness</span> business
        </h1>
        <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
    </div>
);

export default Quote;
