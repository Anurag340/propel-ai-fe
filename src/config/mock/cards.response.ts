export const MOCK_CARDS_HTML = `
<div class="resource-card" style="background-color: rgba(0, 0, 0, 0.05); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); max-width: 200px; flex: 1;">
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <img src="https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/68ff5611e11ca53c0cce2fa9_Retention%20Strategies%20Post%20Onboarding-1-min.png" alt="Mock Product 1" style="width: 100%; height: 6rem; border-radius: 0.5rem; object-fit: cover; display: block;" />
        <div style="flex: 1 1 0%;">
            <h4 style="font-weight: 600; color: rgb(31 41 55); font-size: 0.9rem; margin: 0 0 0.5rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">Retention Strategies</h4>
            <p style="font-size: 0.8rem; color: rgb(75 85 99); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0 0 0.75rem 0; line-height: 1.5;">Learn how to keep your customers engaged after they sign up.</p>
            <div style="display: flex; align-items: center; color: rgb(59 130 246); font-size: 0.8rem; font-weight: 500;">
                <span>Read more</span>
                <svg style="width: 1rem; height: 1rem; margin-left: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
    </div>
</div>

<div class="resource-card" style="background-color: rgba(0, 0, 0, 0.05); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); max-width: 200px; flex: 1;">
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <img src="https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/6904930a80f7d8b5f8554433_Reduce%20Customer%20Churn-1-min.png" alt="Mock Product 2" style="width: 100%; height: 6rem; border-radius: 0.5rem; object-fit: cover; display: block;" />
        <div style="flex: 1 1 0%;">
            <h4 style="font-weight: 600; color: rgb(31 41 55); font-size: 0.9rem; margin: 0 0 0.5rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">Reduce Churn</h4>
            <p style="font-size: 0.8rem; color: rgb(75 85 99); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0 0 0.75rem 0; line-height: 1.5;">Actionable tips to reduce customer churn and increase LTV.</p>
            <div style="display: flex; align-items: center; color: rgb(59 130 246); font-size: 0.8rem; font-weight: 500;">
                <span>Read more</span>
                <svg style="width: 1rem; height: 1rem; margin-left: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
    </div>
</div>

<div class="resource-card" style="background-color: rgba(0, 0, 0, 0.05); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); max-width: 200px; flex: 1;">
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <img src="https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/694136457b9ac6de6866375e_Duo%20Lingo%27s%20Customer%20Retention%20Strategy-1.png" alt="Mock Product 3" style="width: 100%; height: 6rem; border-radius: 0.5rem; object-fit: cover; display: block;" />
        <div style="flex: 1 1 0%;">
            <h4 style="font-weight: 600; color: rgb(31 41 55); font-size: 0.9rem; margin: 0 0 0.5rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">Case Study: Duolingo</h4>
            <p style="font-size: 0.8rem; color: rgb(75 85 99); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0 0 0.75rem 0; line-height: 1.5;">How Duolingo mastered retention with gamification.</p>
            <div style="display: flex; align-items: center; color: rgb(59 130 246); font-size: 0.8rem; font-weight: 500;">
                <span>Read more</span>
                <svg style="width: 1rem; height: 1rem; margin-left: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
    </div>
</div>
`;

export const MOCK_CARDS = [
    {
        title: "Retention Strategies",
        description: "Learn how to keep your customers engaged after they sign up.",
        image: "https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/68ff5611e11ca53c0cce2fa9_Retention%20Strategies%20Post%20Onboarding-1-min.png",
        url: "https://example.com/retention",
        link: "https://example.com/retention"
    },
    {
        title: "Reduce Churn",
        description: "Actionable tips to reduce customer churn and increase LTV.",
        image: "https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/6904930a80f7d8b5f8554433_Reduce%20Customer%20Churn-1-min.png",
        url: "https://example.com/churn",
        link: "https://example.com/churn"
    },
    {
        title: "Case Study: Duolingo",
        description: "How Duolingo mastered retention with gamification.",
        image: "https://cdn.prod.website-files.com/677f54ef384da10cc770ee4e/694136457b9ac6de6866375e_Duo%20Lingo%27s%20Customer%20Retention%20Strategy-1.png",
        url: "https://example.com/duolingo",
        link: "https://example.com/duolingo"
    }
];
