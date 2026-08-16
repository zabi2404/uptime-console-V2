import Button from '../../components/common/Buttons/Button'

function DangeZone() {
    return (
        <>
<div className="mt-5 overflow-hidden rounded-lg border border-red-200">

    {/* Header */}
    <div className="border-b border-red-200 bg-red-50 px-5 py-3">
        <h2 className="text-sm font-semibold text-red-700">
            Danger zone
        </h2>
        <p className="mt-0.5 text-xs text-red-600/70">
            Irreversible actions for your workspace
        </p>
    </div>

    {/* Reset history */}
    <div className="flex xsm:flex-col md:flex-row items-center justify-between gap-6 px-5 py-4">
        <div>
            <h3 className="text-sm font-medium text-gray-900">
                Reset health check history
            </h3>

            <p className="mt-0.5 max-w-2xl text-xs text-gray-500">
                Clears all logged check results and latency history.
                Your projects will not be affected.
            </p>
        </div>

        <Button
            name="Reset history"
            variant="danger"
        />
    </div>

    <div className="border-t border-gray-200" />

    {/* Delete workspace */}
    <div className="flex xsm:flex-col md:flex-row items-center justify-between gap-6 px-5 py-4">
        <div>
            <h3 className="text-sm font-medium text-gray-900">
                Delete workspace
            </h3>

            <p className="mt-0.5 max-w-2xl text-xs text-gray-500">
                Permanently deletes all projects, domains, integrations,
                and history. This action cannot be undone.
            </p>
        </div>

        <Button
            name="Delete workspace"
            variant="danger"
        />
    </div>

</div>
        </>
    )
}

export default DangeZone