import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import type { Member } from '../../types/Member';
import { getMemberById } from '../../services/membersService'; // Will create this service
import { formatDate } from '../../utils/dateFormatter';

const MemberProfile: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!memberId) {
        setError('Member ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getMemberById(memberId);
        setMember(data);
      } catch (err) {
        setError('Failed to fetch member profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [memberId]);

  if (loading) return <div className="text-center p-8">Loading member profile...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  if (!member) return <div className="text-center p-8 text-gray-600">Member not found.</div>;

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-2xl mx-auto text-center">
        <img
          src={member.avatarUrl || '/src/assets/default-avatar.png'}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-blue-300 shadow-md"
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-2">{member.name}</h1>
        <p className="text-xl text-blue-600 mb-4">{member.relation}</p>
        <p className="text-gray-700 text-lg mb-4">{member.bio || 'No biography available.'}</p>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-gray-600 text-base mb-2"><span className="font-semibold">Date of Birth:</span> {formatDate(member.dob)}</p>
          {/* Add more member details here, e.g., contact info, family tree links */}
        </div>

        <div className="flex justify-end mt-8">
          <Link to="/members">
            <Button variant="secondary">Back to Members List</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default MemberProfile;