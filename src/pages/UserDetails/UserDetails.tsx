import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack, BiStar } from 'react-icons/bi';
import { mockApi } from '../../services/api/mockApi';
import type { UserDetails as UserDetailsType } from '../../types/user';
import styles from './UserDetails.module.scss';

export const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const details = await mockApi.getUserDetails(userId);
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleBackToUsers = () => {
    navigate('/users');
  };

  const handleBlacklist = () => {
    console.log('Blacklist user:', userId);
    // TODO: Implement blacklist functionality
  };

  const handleActivate = () => {
    console.log('Activate user:', userId);
    // TODO: Implement activate functionality
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading user details...</div>;
  }

  if (!userDetails) {
    return <div className={styles.error}>User not found</div>;
  }

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, index) => (
      <BiStar
        key={index}
        className={index < tier ? styles.starFilled : styles.starEmpty}
      />
    ));
  };

  const tabs = [
    { id: 'general', label: 'General Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'app', label: 'App and System' },
  ];

  return (
    <div className={styles.userDetailsPage}>
      {/* Back Button */}
      <button onClick={handleBackToUsers} className={styles.backButton}>
        <BiArrowBack /> Back to Users
      </button>

      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>User Details</h1>
        <div className={styles.actionButtons}>
          <button onClick={handleBlacklist} className={styles.blacklistButton}>
            BLACKLIST USER
          </button>
          <button onClick={handleActivate} className={styles.activateButton}>
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileSection}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <BiStar size={40} />
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>
                {userDetails.personalInfo.fullName}
              </h2>
              <p className={styles.userId}>{userDetails.id}</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.tierSection}>
            <p className={styles.sectionLabel}>User's Tier</p>
            <div className={styles.stars}>
              {renderStars(userDetails.accountInfo.tier)}
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.accountSection}>
            <h3 className={styles.accountBalance}>
              {userDetails.accountInfo.accountBalance}
            </h3>
            <p className={styles.bankInfo}>
              {userDetails.accountInfo.accountNumber}/
              {userDetails.accountInfo.bankName}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <div className={styles.contentSection}>
          {/* Personal Information */}
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>FULL NAME</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.fullName}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>PHONE NUMBER</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.phoneNumber}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>EMAIL ADDRESS</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.emailAddress}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>BVN</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.bvn}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>GENDER</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.gender}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>MARITAL STATUS</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.maritalStatus}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CHILDREN</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.children}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>TYPE OF RESIDENCE</span>
                <span className={styles.infoValue}>
                  {userDetails.personalInfo.typeOfResidence}
                </span>
              </div>
            </div>
          </div>

          {/* Education and Employment */}
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Education and Employment</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>LEVEL OF EDUCATION</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.levelOfEducation}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>EMPLOYMENT STATUS</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.employmentStatus}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>SECTOR OF EMPLOYMENT</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.sectorOfEmployment}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>DURATION OF EMPLOYMENT</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.durationOfEmployment}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>OFFICE EMAIL</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.officeEmail}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>MONTHLY INCOME</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.monthlyIncome}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>LOAN REPAYMENT</span>
                <span className={styles.infoValue}>
                  {userDetails.educationAndEmployment.loanRepayment}
                </span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Socials</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>TWITTER</span>
                <span className={styles.infoValue}>
                  {userDetails.socials.twitter}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>FACEBOOK</span>
                <span className={styles.infoValue}>
                  {userDetails.socials.facebook}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>INSTAGRAM</span>
                <span className={styles.infoValue}>
                  {userDetails.socials.instagram}
                </span>
              </div>
            </div>
          </div>

          {/* Guarantor */}
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Guarantor</h3>
            {userDetails.guarantors.map((guarantor, index) => (
              <div key={index}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>FULL NAME</span>
                    <span className={styles.infoValue}>
                      {guarantor.fullName}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>PHONE NUMBER</span>
                    <span className={styles.infoValue}>
                      {guarantor.phoneNumber}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>EMAIL ADDRESS</span>
                    <span className={styles.infoValue}>
                      {guarantor.emailAddress}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>RELATIONSHIP</span>
                    <span className={styles.infoValue}>
                      {guarantor.relationship}
                    </span>
                  </div>
                </div>
                {index < userDetails.guarantors.length - 1 && (
                  <div className={styles.guarantorDivider}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab !== 'general' && (
        <div className={styles.contentSection}>
          <div className={styles.emptyState}>
            <p>Content for {tabs.find((t) => t.id === activeTab)?.label}</p>
            <p className={styles.emptySubtext}>Coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};
