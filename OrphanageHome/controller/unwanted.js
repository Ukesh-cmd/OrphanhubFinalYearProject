const calculateComplexAllocation = (donatedAmount, categories, donationGoal) => {
    const allocation = {};
    let remainingAmount = donatedAmount;


    categories.forEach((category) => {
        category.weight += Math.random() * 0.1 - 0.05; // Adjust weight randomly within a small range
        category.weight = Math.max(0, Math.min(1, category.weight)); // Ensuring weight is between 0 and 1
    });

    // Priority Categories: Allocate a fixed percentage to priority categories
    const priorityAllocationPercentage = 0.2; // 20%
    categories.forEach((category) => {
        if (category.priority) {
            const priorityAllocationAmount = donatedAmount * priorityAllocationPercentage;
            allocation[category.name] = (allocation[category.name] || 0) + priorityAllocationAmount;
            remainingAmount -= priorityAllocationAmount;
        }
    });

    // Calculate the allocation based on updated category weights
    while (remainingAmount > 0) {
        const totalWeight = categories.reduce((acc, category) => acc + category.weight, 0);
        const averageWeight = totalWeight / categories.length;

        categories.forEach((category) => {
            const weightDiff = category.weight - averageWeight;
            const allocationAmount = donatedAmount * (weightDiff / totalWeight);
            allocation[category.name] = (allocation[category.name] || 0) + allocationAmount;
            remainingAmount -= allocationAmount;
        });
    }

    const donationProgress = (donatedAmount / donationGoal) * 100;
    if (donationProgress < 50) {
        categories.forEach((category) => {
            if (category.name === 'Education') {
                allocation[category.name] += donatedAmount * 0.1;
            }
        });
    }

    return allocation;
};
