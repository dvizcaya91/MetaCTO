import { useNavigate } from 'react-router'

import { CreateFeatureModal } from '@/components/organisms/CreateFeatureModal'
import { FeatureList } from '@/components/organisms/FeatureList'
import { useAuth } from '@/hooks/auth/useAuth'
import { useDashboardFeatures } from '@/hooks/features/useDashboardFeatures'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isSessionBootstrapping } = useAuth()
  const {
    actionError,
    activeVoteFeatureId,
    closeCreateModal,
    currentPage,
    errorMessage,
    features,
    isCreateModalOpen,
    isLoading,
    openCreateModal,
    onSearchChange,
    onSortChange,
    onTabChange,
    onToggleVote,
    query,
    refresh,
    setPage,
    sort,
    tab,
    totalCount,
    totalPages,
  } = useDashboardFeatures()

  return (
    <div>
      <CreateFeatureModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreated={async () => {
          await refresh()
        }}
      />
      <FeatureList
        actionError={actionError}
        activeVoteFeatureId={activeVoteFeatureId}
        currentPage={currentPage}
        errorMessage={errorMessage}
        features={features}
        isLoading={isLoading || isSessionBootstrapping}
        onCreateFeature={() => {
          if (!isAuthenticated) {
            navigate('/login')
            return
          }

          openCreateModal()
        }}
        onPageChange={setPage}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        onTabChange={onTabChange}
        onToggleVote={onToggleVote}
        query={query}
        refresh={() => {
          void refresh()
        }}
        sort={sort}
        tab={tab}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </div>
  )
}
