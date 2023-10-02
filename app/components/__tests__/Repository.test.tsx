import { Repository } from '../../common/types/GitHub';
import { render, screen } from '@testing-library/react';
import RepositoryCard from '../RepositoryCard';

describe('RepositoryCard', () =>{
  it('should render', () => {
    const mockRepository: Repository = {
      id: '1',
      name: 'repo-one',
      description: 'Test repo',
      stargazerCount: 5,
      forkCount: 10,
      url: 'https://github.com/repo-one',
      primaryLanguage: {
        color: 'blue',
        name: 'JavaScript'
      }
    };

    render(<RepositoryCard repository={mockRepository} />);

    expect(screen.getByTestId('repository-card')).toBeInTheDocument();
    expect(screen.getByText(mockRepository.name)).toHaveAttribute('href', mockRepository.url);
    expect(screen.getByText(mockRepository.description)).toBeInTheDocument();
    expect(screen.getByTestId('language-color')).toHaveStyle({ backgroundColor: mockRepository.primaryLanguage!.color });
    expect(screen.getByText(mockRepository.primaryLanguage!.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepository.stargazerCount)).toBeInTheDocument();
    expect(screen.getByText(mockRepository.forkCount)).toBeInTheDocument();
  });

  it('should not render language when missing', () => {
    const mockRepository: Repository = {
      id: '1',
      name: 'repo-one',
      description: 'Test repo',
      stargazerCount: 5,
      forkCount: 10,
      url: 'https://github.com/repo-one',
      primaryLanguage: null,
    };

    render(<RepositoryCard repository={mockRepository} />);

    expect(screen.queryByTestId('language-color')).not.toBeInTheDocument();
  });

  it('should not render counts when zero', () => {
    const mockRepository: Repository = {
      id: '1',
      name: 'repo-one',
      description: 'Test repo',
      stargazerCount: 0,
      forkCount: 0,
      url: 'https://github.com/repo-one',
      primaryLanguage: {
        color: 'blue',
        name: 'JavaScript'
      }
    };

    render(<RepositoryCard repository={mockRepository} />);

    expect(screen.queryByText(mockRepository.stargazerCount)).not.toBeInTheDocument();
    expect(screen.queryByText(mockRepository.forkCount)).not.toBeInTheDocument();
  });
});