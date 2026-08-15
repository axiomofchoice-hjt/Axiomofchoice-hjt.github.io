---
title: Codeforces Round 646 (Div. 2) 题解 (ABCDE)
date: 2020-06-01 09:16:00
permalink: /pages/0d4c58/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

<https://codeforces.com/contest/1363>

## A. Odd Selection

第一反应当然是分类讨论 if 到底。想了一下发现好像有点麻烦，正好 n 又不大所以 for 一下。

枚举的方法，枚举原数组中取多少偶数（记为 i），那么原数组中奇数就要取 x-i 个，只要判断 x-i 是否为奇数并且原数组的奇数个数是否大于等于 x-i 就行了。

分类讨论的方法，难顶，详见代码。

枚举的代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,x,a[2],t;
void output(bool x){cout<<(x?"Yes":"No")<<endl;}
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>x;
        a[0]=a[1]=0;
        int f=0;
        repeat(i,0,n)cin>>t,a[t%2]++;
        repeat(i,0,a[0]+1){
            if((x-i)%2==1 && a[1]>=x-i){
                output(1);
                f=1;
                break;
            }
        }
        if(!f)output(0);
    }
    return 0;
}
```

分类讨论的代码（转载自 %%%施老师）：

```cpp
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
using namespace std;
int T,n,k,x,num1,num2;
int main()
{
    scanf("%d",&T);
    while (T--)
    {
        scanf("%d%d",&n,&k); num1=0; num2=0;
        for (int i=1;i<=n;i++)
        {
            scanf("%d",&x);
            if (x&1) num1++;else num2++;
        }
        if (num1==0) printf("No\n");
        else
        {
            num1--; k--; k-=2*min(num1/2,k/2);
            if (k<=num2) printf("Yes\n");else printf("No\n");
        }
    }
return 0;    
}
```

## B. Subsequence Hate

显而易见，s 最终只有两种情况，00..0011..11 和 11..1100..00。我们枚举一下 01 分界线。为了加点速，要用前缀和记录前 x 个位置有多少 1，这样 `O(1)` 询问答案，~~美滋滋~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,sum[N];
string s;
int q1(int l,int r){ //询问[l,r]有多少个1
    return sum[r]-sum[l-1];
}
int q0(int l,int r){ //询问[l,r]有多少个0
    return r-l+1-q1(l,r);
}
signed main(){
    cin>>T;
    while(T--){
        cin>>s; s='x'+s; 
        int n=s.size()-1;
        repeat(i,1,n+1)
            sum[i]=sum[i-1]+(s[i]=='1');
        int ans=1e9;
        repeat(i,0,n+1){ //枚举分界线
            ans=min(ans,q0(1,i)+q1(i+1,n));
            ans=min(ans,q1(1,i)+q0(i+1,n));
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## C. Game On Leaves

一般来说，双方都会尽量不让 x 节点的度变成小于等于 1，因此这个 x 节点大多情况都是倒数第二个取走的。除了 x 节点的度已经小于等于 1 了。

所以只要判断 x 节点的度是否小于等于 1，再判断 n 的奇偶性就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,x;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>x;
        int deg=0;
        repeat(i,0,n-1){
            int u,v; cin>>u>>v;
            if(u==x || v==x)deg++;
        }
        if(deg<=1 || n%2==0)cout<<"Ayush"<<endl;
        else cout<<"Ashish"<<endl;
    }
    return 0;
}
```

## D. Guess The Maximums

如果你觉得数组 A 遍历了 `[1,n]`，或者 Si 遍历了 `[1,n]`，或者两个地雷一起踩（正是在下），那就有可能 fst 惨案（没考虑数组 A 的最大值不一定是 n 的话，会 wa41，这已经不是 pretest 了 qwq）。

先询问一下数组 A 中的最大值，记为 maxx。因为只有包含了 A 中所有的 maxx 的集合，其补集的最大值才不是 maxx，因此，其他集合的答案已经确定为 maxx 了，我们只要找到这个神奇的集合，然后询问这个集合的补集作为这个集合的答案，这题就完成了。

而找这个神奇的集合，只要二分查找就行了。注意因为询问次数卡得很紧，千万不要有多余的询问。比如之前我询问了神奇集合是否包含 maxx，如果包含了再询问这个集合的补集，实际上第一个询问不是必要的，因为询问任一集合的补集都是这个集合的答案。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1010; typedef long long ll;
int T,n,k;
vector<int> a[N]; //存第i个集合的内容
vector<int> q; //存放询问内容
int ans[N]; //存放最终答案
string s;
int query(){ //询问
    cout<<"? "<<q.size()<<' ';
    for(auto i:q)cout<<i<<' '; cout<<endl;
    cout.flush();
    int ans; cin>>ans; if(ans==-1)exit(233);
    return ans;
}
void pushquery(int l,int r){ //讲一个区间的集合的内容存入q中
    repeat(i,l,r+1)
    for(auto j:a[i])
        q.push_back(j);
}
void output(){ //输出最终答案
    cout<<"! ";
    repeat(i,1,k+1)cout<<ans[i]<<' '; cout<<endl;
    cout.flush();
    cin>>s; if(s[0]=='I')exit(234);
}
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>k;
        repeat(i,1,k+1){
            int c; cin>>c;
            a[i].clear();
            while(c--){
                int x; cin>>x;
                a[i].push_back(x);
            }
        }
        int l=1,r=k;
        
        q.clear();
        repeat(i,1,n+1)q.push_back(i);
        int maxx=query(); //询问max(Ai)
        fill(ans+1,ans+k+1,maxx);
        
        while(l<r){ //二分查找可能包含maxx的集合
            int m=(l+r)/2;
            q.clear(); pushquery(l,m);
            if(query()!=maxx)l=m+1;
            else r=m;
        }
        int t=l; //此时St可能包含maxx
        
        sort(a[t].begin(),a[t].end());
        q.clear();
        repeat(i,1,n+1){
            if(!binary_search(a[t].begin(),a[t].end(),i))
                q.push_back(i);
        }
        ans[t]=query(); //询问St的补集，作为ans[t]的答案（唯一可能不是maxx的答案）
        output();
    }
    return 0;
}
```

## E. Tree Shuffling

树型 dp。

我们让儿子的费用（即 `a[i]`）赋值为 `min`(儿子费用,父亲费用)，这样操作的好处是，如果儿子所在的子树存在需要互换的两个节点，那一定是儿子解决这个问题而不是去麻烦父亲乃至祖宗。

因此只要统计每个子树的需要把 0 变 1 的节点个数，以及 1 变 0 的节点个数，然后及时计算费用，然后把这两个值传给父亲即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int n,x;
vector<int> a[N];
int cost[N],b[N],c[N],ans,cnt[N][2];
void dfs(int x,int fa){
    if(fa!=-1)cost[x]=min(cost[x],cost[fa]); 
    for(auto p:a[x])
    if(p!=fa){
        dfs(p,x);
        cnt[x][0]+=cnt[p][0];
        cnt[x][1]+=cnt[p][1];
    }
    if(b[x]!=c[x])cnt[x][b[x]]++;
    int t=min(cnt[x][0],cnt[x][1]);
    ans+=2*t*cost[x];
    cnt[x][0]-=t;
    cnt[x][1]-=t;
}
signed main(){
    cin>>n;
    repeat(i,0,n)cin>>cost[i]>>b[i]>>c[i];
    repeat(i,0,n-1){
        int x,y; cin>>x>>y; x--,y--;
        a[x].push_back(y);
        a[y].push_back(x);
    }
    dfs(0,-1);
    if(cnt[0][0] || cnt[0][1])cout<<-1<<endl;
    else cout<<ans<<endl;
    return 0;
}
```
