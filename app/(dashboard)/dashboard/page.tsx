import AccountOverviewChart from "../_components/acct-overview-chart";
import StatBubbles from "../_components/stat-bubble";
import ActivityLog from "../_components/activity-log";
import TransactionRecordsSummary from "../_components/transaction-records-summary";

export default function page() {




    return (
        <div>
            <StatBubbles />
            <div className="flex justify-between gap-5 mt-8">
                <AccountOverviewChart />
                <ActivityLog />
            </div>
            <div className="mt-8">
                <TransactionRecordsSummary/>
            </div>
        </div>
    )
}