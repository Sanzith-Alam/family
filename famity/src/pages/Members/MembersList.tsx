import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import type { Member } from "../../types/Member";
import { getMembers } from "../../services/membersService"; // Will create this service
import { Link } from "react-router-dom";

const MembersList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembers();
        setMembers(data);
      } catch (err) {
        setError("Failed to fetch members.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="text-center p-8">Loading members...</div>;
  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Our Family Members
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No members found.
          </p>
        ) : (
          members.map((member) => (
            <Card
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <img
                src={member.avatarUrl || "/src/assets/default-avatar.png"} // Use default avatar if none provided
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {member.name}
              </h2>
              <p className="text-blue-600 mb-3">{member.relation}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {member.bio || "No bio available."}
              </p>
              <Link to={`/members/${member.id}`} className="w-full">
                <Button variant="secondary" className="w-full">
                  View Profile
                </Button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MembersList;
